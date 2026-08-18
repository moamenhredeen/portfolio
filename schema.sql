-- Comments for blog posts. One row per submitted comment.
-- Moderation is hold-for-approval: rows land with approved = 0 and are only
-- served publicly once approved = 1 (see the approve command in README/tasks).
CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  slug       TEXT    NOT NULL,               -- post path, e.g. /blog/typescript/extends-never/
  author     TEXT    NOT NULL,               -- display name (name-only identity)
  body       TEXT    NOT NULL,               -- comment text
  approved   INTEGER NOT NULL DEFAULT 0,     -- 0 = pending moderation, 1 = public
  created_at TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Fast lookup of the public thread for a post, newest-appended order.
CREATE INDEX IF NOT EXISTS idx_comments_slug_approved
  ON comments (slug, approved, created_at);
