import type { z } from 'zod';
import type {
  noticeAnalysisRequestSchema,
  noticeAnalysisResponseSchema,
  checklistItemSchema,
  confidenceSchema,
  prioritySchema,
  replyDraftSchema,
  riskFlagSchema,
  severitySchema,
  summarySchema,
  timelineItemSchema
} from './schema';

export type NoticeAnalysisRequest = z.infer<typeof noticeAnalysisRequestSchema>;
export type NoticeAnalysisResponse = z.infer<typeof noticeAnalysisResponseSchema>;
export type NoticeSummary = z.infer<typeof summarySchema>;
export type TimelineItem = z.infer<typeof timelineItemSchema>;
export type ChecklistItem = z.infer<typeof checklistItemSchema>;
export type RiskFlag = z.infer<typeof riskFlagSchema>;
export type ReplyDraft = z.infer<typeof replyDraftSchema>;
export type Confidence = z.infer<typeof confidenceSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type Severity = z.infer<typeof severitySchema>;
