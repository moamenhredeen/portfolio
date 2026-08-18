var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/worker.ts
var MAX_AUTHOR = 80;
var MAX_BODY = 5e3;
var json = /* @__PURE__ */ __name((data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8" }
}), "json");
async function listComments(env, slug) {
  const { results } = await env.DB.prepare(
    `SELECT id, author, body, created_at
       FROM comments
      WHERE slug = ? AND approved = 1
      ORDER BY created_at ASC, id ASC`
  ).bind(slug).all();
  return json({ comments: results ?? [] });
}
__name(listComments, "listComments");
async function createComment(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }
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
    `INSERT INTO comments (slug, author, body, approved) VALUES (?, ?, ?, 0)`
  ).bind(slug, author, body).run();
  return json({ ok: true, pending: true }, 202);
}
__name(createComment, "createComment");
var worker_default = {
  async fetch(request, env) {
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
    return env.ASSETS.fetch(request);
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
