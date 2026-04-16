import { describe, expect, it } from 'vitest';

import {
  DEFAULT_DISCLAIMER,
  noticeAnalysisRequestSchema,
  noticeAnalysisResponseSchema
} from '../../src/shared/schema';

describe('noticeAnalysisRequestSchema', () => {
  it('accepts a required notice with optional context', () => {
    const parsed = noticeAnalysisRequestSchema.parse({
      noticeText: 'Please provide 30 days notice before move-out.',
      leaseContext: 'Lease says notices must be sent in writing.',
      renterContext: 'Planning to move in June.',
      questions: 'Is email enough?'
    });

    expect(parsed.noticeText).toContain('30 days');
    expect(parsed.leaseContext).toContain('in writing');
  });

  it('rejects an empty notice text', () => {
    expect(() =>
      noticeAnalysisRequestSchema.parse({
        noticeText: '   '
      })
    ).toThrow();
  });
});

describe('noticeAnalysisResponseSchema', () => {
  it('fills safe defaults for omitted arrays and disclaimer', () => {
    const parsed = noticeAnalysisResponseSchema.parse({
      summary: {
        situation: 'The lease likely expects written notice before move-out.',
        confidence: 'medium'
      },
      replyDraft: {
        message: 'Hi, I want to confirm the notice procedure.'
      }
    });

    expect(parsed.summary.disclaimer).toBe(DEFAULT_DISCLAIMER);
    expect(parsed.timeline).toEqual([]);
    expect(parsed.checklist).toEqual([]);
    expect(parsed.riskFlags).toEqual([]);
    expect(parsed.missingInformation).toEqual([]);
    expect(parsed.questionsToConfirm).toEqual([]);
  });
});
