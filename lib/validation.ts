import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  mobile: z
    .string()
    .trim()
    .max(20)
    .regex(/^[0-9+\-\s()]*$/, "Please enter a valid mobile number")
    .optional()
    .or(z.literal("")),
  source: z.string().trim().max(60).default("lead-popup"),
  page: z.string().trim().max(160).default("/"),
});

export const sampleRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
  mobile: z.string().trim().max(20).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  projectType: z.string().trim().max(80).optional().or(z.literal("")),
  projectLocation: z.string().trim().max(160).optional().or(z.literal("")),
  finishSlug: z.string().trim().max(160).optional().or(z.literal("")),
  colourSwatchId: z.string().trim().max(160).optional().or(z.literal("")),
  estimatedArea: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email address"),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type SampleRequestInput = z.infer<typeof sampleRequestSchema>;
