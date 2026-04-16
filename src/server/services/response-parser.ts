import { ZodError } from 'zod';

import {
  normalizeNoticeAnalysisResponse,
  DEFAULT_DISCLAIMER
} from '../../shared/schema';
import { ResponseParseError } from '../lib/errors';

function extractJsonCandidate(raw: string) {
  const trimmed = raw.trim();

  if (!trimmed) {
    throw new ResponseParseError('The AI response was empty.');
  }

  if (trimmed.startsWith('```')) {
    const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch?.[1]) {
      return fenceMatch[1].trim();
    }
  }

  const firstBrace = trimmed.indexOf('{');
  const lastBrace = trimmed.lastIndexOf('}');

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return trimmed;
}

function applySafeDefaults(input: unknown) {
  if (!input || typeof input !== 'object') {
    return input;
  }

  const record = input as Record<string, unknown>;
  const summary =
    record.summary && typeof record.summary === 'object'
      ? { disclaimer: DEFAULT_DISCLAIMER, ...(record.summary as Record<string, unknown>) }
      : record.summary;

  return {
    ...record,
    summary,
    timeline: Array.isArray(record.timeline) ? record.timeline : [],
    checklist: Array.isArray(record.checklist) ? record.checklist : [],
    riskFlags: Array.isArray(record.riskFlags) ? record.riskFlags : [],
    missingInformation: Array.isArray(record.missingInformation) ? record.missingInformation : [],
    questionsToConfirm: Array.isArray(record.questionsToConfirm) ? record.questionsToConfirm : []
  };
}

export function parseNoticeAnalysisResponse(raw: string) {
  try {
    const candidate = extractJsonCandidate(raw);
    const parsed = JSON.parse(candidate);
    return normalizeNoticeAnalysisResponse(applySafeDefaults(parsed));
  } catch (error) {
    if (error instanceof ResponseParseError) {
      throw error;
    }

    if (error instanceof ZodError) {
      throw new ResponseParseError('The AI response did not match the required schema.', error.flatten());
    }

    const message = error instanceof Error ? error.message : 'Unknown response parsing error';
    throw new ResponseParseError(`Could not parse the AI response: ${message}`);
  }
}
