import "server-only";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Local JSON-file persistence for Leads, Sample Requests, Projects,
 * Resources and Articles.
 *
 * This exists so the site has a genuinely working enquiry → admin pipeline
 * without requiring external credentials to be supplied up front. Every
 * read/write goes through this module, so swapping to a real backend
 * (Supabase is the intended target — see README) means rewriting the
 * functions below, not touching any page or component.
 *
 * Known limitation: on serverless hosts (e.g. Vercel) the filesystem is
 * read-only/ephemeral in production, so writes here only persist reliably
 * on a traditional Node server or in local development. This is expected
 * and documented — production deployment should point this module at
 * Supabase instead.
 */

const DB_DIR = path.join(process.cwd(), "lib", "db");

async function readJson<T>(file: string, fallback: T): Promise<T> {
  const filePath = path.join(DB_DIR, file);
  if (!existsSync(filePath)) return fallback;
  const raw = await readFile(filePath, "utf-8");
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  if (!existsSync(DB_DIR)) await mkdir(DB_DIR, { recursive: true });
  const filePath = path.join(DB_DIR, file);
  await writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function createCollection<T extends { id: string }>(file: string) {
  return {
    async all(): Promise<T[]> {
      return readJson<T[]>(file, []);
    },
    async find(id: string): Promise<T | undefined> {
      const items = await readJson<T[]>(file, []);
      return items.find((i) => i.id === id);
    },
    async create(item: T): Promise<T> {
      const items = await readJson<T[]>(file, []);
      items.unshift(item);
      await writeJson(file, items);
      return item;
    },
    async update(id: string, patch: Partial<T>): Promise<T | undefined> {
      const items = await readJson<T[]>(file, []);
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return undefined;
      items[idx] = { ...items[idx], ...patch };
      await writeJson(file, items);
      return items[idx];
    },
    async remove(id: string): Promise<void> {
      const items = await readJson<T[]>(file, []);
      await writeJson(
        file,
        items.filter((i) => i.id !== id),
      );
    },
  };
}

import type { Article, Lead, Project, Resource, SampleRequest } from "@/types";

export const leadsStore = createCollection<Lead>("leads.json");
export const sampleRequestsStore = createCollection<SampleRequest>("sample-requests.json");
export const projectsStore = createCollection<Project>("projects.json");
export const resourcesStore = createCollection<Resource>("resources.json");
export const articlesStore = createCollection<Article>("articles.json");
