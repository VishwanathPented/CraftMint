import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key, since all writes
 * happen from trusted API routes (there is no client-side Supabase usage).
 *
 * Every collection (see supabase/schema.sql) is a plain `id text primary key,
 * data jsonb` document table, so a single loosely-typed schema covers all of
 * them.
 */

export type TableName = "leads" | "sample_requests" | "projects" | "resources" | "articles";

type DocumentTable = {
  Row: { id: string; data: Record<string, unknown>; created_at: string };
  Insert: { id: string; data: Record<string, unknown>; created_at?: string };
  Update: { id?: string; data?: Record<string, unknown>; created_at?: string };
  Relationships: [];
};

type Database = {
  public: {
    Tables: Record<TableName, DocumentTable>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.local.example to .env.local and fill in your Supabase project's credentials (see SETUP.md).`,
    );
  }
  return value;
}

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (!client) {
    client = createClient<Database>(getEnv("SUPABASE_URL"), getEnv("SUPABASE_SERVICE_ROLE_KEY"), {
      auth: { persistSession: false },
    });
  }
  return client;
}

export const UPLOADS_BUCKET = "uploads";
