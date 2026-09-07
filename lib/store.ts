import "server-only";
import { getSupabase, type TableName } from "@/lib/supabase";

/**
 * Supabase-backed persistence for Leads, Sample Requests, Projects,
 * Resources and Articles.
 *
 * Every read/write goes through this module, so it's the only place that
 * knows about the storage shape (see supabase/schema.sql — each collection
 * is a simple `id` + `data jsonb` table, ordered by `created_at desc`).
 */

export function createCollection<T extends { id: string }>(table: TableName) {
  return {
    async all(): Promise<T[]> {
      const { data, error } = await getSupabase()
        .from(table)
        .select("data")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((row) => row.data as T);
    },
    async find(id: string): Promise<T | undefined> {
      const { data, error } = await getSupabase().from(table).select("data").eq("id", id).maybeSingle();
      if (error) throw error;
      return (data?.data as T) ?? undefined;
    },
    async create(item: T): Promise<T> {
      const { error } = await getSupabase()
        .from(table)
        .insert({ id: item.id, data: item });
      if (error) throw error;
      return item;
    },
    async update(id: string, patch: Partial<T>): Promise<T | undefined> {
      const existing = await this.find(id);
      if (!existing) return undefined;
      const updated = { ...existing, ...patch };
      const { error } = await getSupabase().from(table).update({ data: updated }).eq("id", id);
      if (error) throw error;
      return updated;
    },
    async remove(id: string): Promise<void> {
      const { error } = await getSupabase().from(table).delete().eq("id", id);
      if (error) throw error;
    },
  };
}

import type { Article, Lead, Project, Resource, SampleRequest } from "@/types";

export const leadsStore = createCollection<Lead>("leads");
export const sampleRequestsStore = createCollection<SampleRequest>("sample_requests");
export const projectsStore = createCollection<Project>("projects");
export const resourcesStore = createCollection<Resource>("resources");
export const articlesStore = createCollection<Article>("articles");
