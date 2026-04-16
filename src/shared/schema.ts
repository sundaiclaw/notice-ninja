import { z } from 'zod';

export const DEFAULT_DISCLAIMER =
  'This is not legal advice. Verify deadlines, delivery requirements, and local housing rules before acting.';

const trimmedString = z.string().trim().min(1);
const optionalTrimmedString = z
  .string()
  .optional()
  .transform((value) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
  });

export const confidenceSchema = z.enum(['high', 'medium', 'low']);
export const prioritySchema = z.enum(['high', 'medium', 'low']);
export const severitySchema = z.enum(['high', 'medium', 'low']);

export const noticeAnalysisRequestSchema = z.object({
  noticeText: trimmedString,
  leaseContext: optionalTrimmedString,
  renterContext: optionalTrimmedString,
  questions: optionalTrimmedString
});

export const summarySchema = z.object({
  situation: trimmedString,
  confidence: confidenceSchema,
  disclaimer: trimmedString.default(DEFAULT_DISCLAIMER)
});

export const timelineItemSchema = z.object({
  title: trimmedString,
  dateText: trimmedString,
  confidence: confidenceSchema,
  basis: trimmedString,
  caveat: optionalTrimmedString
});

export const checklistItemSchema = z.object({
  task: trimmedString,
  priority: prioritySchema,
  category: trimmedString,
  reason: trimmedString,
  evidence: trimmedString
});

export const riskFlagSchema = z.object({
  title: trimmedString,
  severity: severitySchema,
  detail: trimmedString,
  mitigation: trimmedString
});

export const replyDraftSchema = z.object({
  subject: optionalTrimmedString,
  message: trimmedString
});

export const noticeAnalysisResponseSchema = z.object({
  summary: summarySchema,
  timeline: z.array(timelineItemSchema).default([]),
  checklist: z.array(checklistItemSchema).default([]),
  riskFlags: z.array(riskFlagSchema).default([]),
  missingInformation: z.array(trimmedString).default([]),
  questionsToConfirm: z.array(trimmedString).default([]),
  replyDraft: replyDraftSchema
});

export function normalizeNoticeAnalysisResponse(input: unknown) {
  return noticeAnalysisResponseSchema.parse(input);
}
