/**
 * Zod validation schemas for LinkedIn Connections data
 */

import { z } from 'zod';

export const LinkedInConnectionSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  company: z.string().optional(),
  position: z.string().optional(),
  connectedOn: z.string().optional(),
});

export type LinkedInConnection = z.infer<typeof LinkedInConnectionSchema>;
