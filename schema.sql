-- Database schema for Agency Website CMS
-- Run: wrangler d1 execute agency-db --file=./schema.sql

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL,
  last_login TEXT
);

-- Site content table (key-value store for flexible content)
CREATE TABLE IF NOT EXISTS site_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_key TEXT UNIQUE NOT NULL,
  content_value TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  updated_at TEXT NOT NULL,
  updated_by INTEGER,
  FOREIGN KEY (updated_by) REFERENCES admin_users(id)
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Portfolio items table
CREATE TABLE IF NOT EXISTS portfolio (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  tags TEXT,
  featured INTEGER DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

-- Session tokens table
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token TEXT UNIQUE NOT NULL,
  user_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES admin_users(id)
);

-- Insert default admin user (password: admin123 - CHANGE THIS!)
-- Password hash for 'admin123' using bcrypt
INSERT OR IGNORE INTO admin_users (username, password_hash, email, created_at)
VALUES ('admin', '$2a$10$rXQbB8z5VqZ0qQXJ9xGxTOvPPFz5YqYKxYGxP.fGVKNzGxQBJZXBm', 'admin@yoursite.com', datetime('now'));

-- Insert default site content
INSERT OR IGNORE INTO site_content (content_key, content_value, content_type, updated_at)
VALUES 
  ('hero_title', 'Crafting Digital Excellence That Drives Results', 'text', datetime('now')),
  ('hero_subtitle', 'We design and build stunning, high-performance websites and digital experiences for forward-thinking businesses ready to dominate their industry.', 'text', datetime('now')),
  ('hero_stat1_number', '500+', 'text', datetime('now')),
  ('hero_stat1_label', 'Projects Delivered', 'text', datetime('now')),
  ('hero_stat2_number', '98%', 'text', datetime('now')),
  ('hero_stat2_label', 'Client Satisfaction', 'text', datetime('now')),
  ('hero_stat3_number', '50+', 'text', datetime('now')),
  ('hero_stat3_label', 'Team Members', 'text', datetime('now')),
  ('site_name', 'Your Agency Name', 'text', datetime('now')),
  ('site_tagline', 'Crafting Digital Excellence', 'text', datetime('now')),
  ('site_email', 'hello@yoursite.com', 'text', datetime('now')),
  ('site_phone', '+1 (555) 123-4567', 'text', datetime('now'));

-- Insert default services
INSERT OR IGNORE INTO services (title, description, icon, display_order, created_at, updated_at)
VALUES 
  ('Web Development', 'Custom websites and web applications built with cutting-edge technology for maximum performance.', 'code', 1, datetime('now'), datetime('now')),
  ('UI/UX Design', 'Beautiful, intuitive interfaces that engage users and drive conversions.', 'palette', 2, datetime('now'), datetime('now')),
  ('Branding', 'Comprehensive brand identity systems that make you stand out from the competition.', 'sparkles', 3, datetime('now'), datetime('now')),
  ('SEO & Marketing', 'Data-driven strategies to increase visibility and grow your online presence.', 'chart', 4, datetime('now'), datetime('now')),
  ('Cloud Solutions', 'Scalable, secure cloud infrastructure on Cloudflare, AWS, and more.', 'cloud', 5, datetime('now'), datetime('now')),
  ('Consulting', 'Expert guidance on technology strategy, architecture, and digital transformation.', 'lightbulb', 6, datetime('now'), datetime('now'));

