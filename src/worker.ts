/// <reference types="@cloudflare/workers-types" />

// Comments API for the blog. Cloudflare invokes this Worker only for requests
// that don't match a static file in ./dist, so in practice it only ever handles
// /api/comments; anything else falls through to the static site via env.ASSETS.
//
// Moderation is hold-for-approval: POSTs are stored with approved = 0 and never
// returned by GET until approved = 1 (see the approve command in tasks.md).

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

const MAX_AUTHOR = 80;
const MAX_BODY = 5000;

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

interface CommentRow {
  id: number;
  author: string;
  body: string;
  created_at: string;
}

async function listComments(env: Env, slug: string): Promise<Response> {
  const { results } = await env.DB.prepare(
    `SELECT id, author, body, created_at
       FROM comments
      WHERE slug = ? AND approved = 1
      ORDER BY created_at ASC, id ASC`,
  )
    .bind(slug)
    .all<CommentRow>();

  return json({ comments: results ?? [] });
}

async function createComment(request: Request, env: Env): Promise<Response> {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  // Honeypot: a hidden field real users never fill. Bots that autofill every
  // input get silently accepted (200) but their input is dropped.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true });
  }

  const slug = typeof payload.slug === "string" ? payload.slug.trim() : "";
  const author = typeof payload.author === "string" ? payload.author.trim() : "";
  const body = typeof payload.body === "string" ? payload.body.trim() : "";

  if (!slug || !slug.startsWith("/")) {
    return json({ error: "Missing or invalid post reference." }, 400);
  }
  if (!author) return json({ error: "Please add a name." }, 400);
  if (author.length > MAX_AUTHOR) return json({ error: "Name is too long." }, 400);
  if (!body) return json({ error: "Comment can't be empty." }, 400);
  if (body.length > MAX_BODY) return json({ error: "Comment is too long." }, 400);

  await env.DB.prepare(
    `INSERT INTO comments (slug, author, body, approved) VALUES (?, ?, ?, 0)`,
  )
    .bind(slug, author, body)
    .run();

  // 202: accepted, awaiting moderation. The client shows a "pending" notice.
  return json({ ok: true, pending: true }, 202);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/comments") {
      if (request.method === "GET") {
        const slug = url.searchParams.get("slug")?.trim();
        if (!slug) return json({ error: "Missing slug." }, 400);
        return listComments(env, slug);
      }
      if (request.method === "POST") {
        return createComment(request, env);
      }
      return json({ error: "Method not allowed." }, 405);
    }

    // Not an API route: serve the static site.
    return env.ASSETS.fetch(request);
  },
};
