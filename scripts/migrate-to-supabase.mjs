// One-time migration: pushes the existing local lib/db/*.json records into
// Supabase. Safe to re-run — it upserts by id.
//
// Usage: node --env-file=.env.local scripts/migrate-to-supabase.mjs
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set (run with --env-file=.env.local).");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const COLLECTIONS = [
  { file: "leads.json", table: "leads" },
  { file: "sample-requests.json", table: "sample_requests" },
  { file: "projects.json", table: "projects" },
  { file: "resources.json", table: "resources" },
  { file: "articles.json", table: "articles" },
];

for (const { file, table } of COLLECTIONS) {
  const filePath = join(process.cwd(), "lib", "db", file);
  const items = JSON.parse(readFileSync(filePath, "utf-8"));
  if (items.length === 0) {
    console.log(`${table}: nothing to migrate`);
    continue;
  }
  const rows = items.map((item) => ({ id: item.id, data: item }));
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
  if (error) {
    console.error(`${table}: failed —`, error.message);
  } else {
    console.log(`${table}: migrated ${rows.length} record(s)`);
  }
}
