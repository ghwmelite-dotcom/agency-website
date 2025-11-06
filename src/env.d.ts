/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Cloudflare Pages types
type D1Database = import('@cloudflare/workers-types').D1Database;

type PagesFunction<Env = unknown> = import('@cloudflare/workers-types').PagesFunction<Env>;

// Environment bindings
interface Env {
  DB?: D1Database;
  AI?: any;
}
