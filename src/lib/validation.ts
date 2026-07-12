/** Zod schemas — single source of truth for form validation (client + server). */
import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{7,15}$/, "Please enter a valid phone number"),
  email: z
    .union([z.string().trim().email("Enter a valid email"), z.literal("")])
    .optional(),
  message: z.string().trim().max(1000).optional(),
  // Hidden context fields
  source: z.enum(["product", "service", "contact", "general"]).default("general"),
  productId: z.coerce.number().int().positive().optional(),
  serviceId: z.coerce.number().int().positive().optional(),
  subject: z.string().trim().max(160).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
