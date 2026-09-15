PRAGMA foreign_keys = ON;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'author' CHECK (role IN ('owner', 'editor', 'author')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sites (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  domain TEXT NOT NULL UNIQUE,
  is_zhevion INTEGER NOT NULL DEFAULT 0 CHECK (is_zhevion IN (0, 1)),
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE site_members (
  site_id TEXT NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('manager', 'contributor')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (site_id, user_id)
);

CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  body_markdown TEXT NOT NULL,
  cover_image_url TEXT,
  canonical_site_id TEXT REFERENCES sites(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
  created_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_authors (
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  sort_order INTEGER NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  PRIMARY KEY (post_id, user_id),
  UNIQUE (post_id, sort_order)
);

CREATE TABLE post_destinations (
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  site_id TEXT NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published')),
  scheduled_for TEXT,
  published_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, site_id),
  CHECK (
    (status = 'scheduled' AND scheduled_for IS NOT NULL) OR
    (status != 'scheduled')
  )
);

CREATE TABLE post_revisions (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  revision_number INTEGER NOT NULL CHECK (revision_number > 0),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  body_markdown TEXT NOT NULL,
  edited_by TEXT NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (post_id, revision_number)
);

CREATE INDEX post_destinations_published_site_idx
  ON post_destinations (site_id, status, published_at DESC);
CREATE INDEX posts_status_updated_idx ON posts (status, updated_at DESC);
CREATE INDEX post_authors_user_idx ON post_authors (user_id, post_id);
