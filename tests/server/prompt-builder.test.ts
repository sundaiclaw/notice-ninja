import { describe, expect, it } from 'vitest';

import { buildNoticeAnalysisPrompt } from '../../src/server/services/prompt-builder';

describe('buildNoticeAnalysisPrompt', () => {
  it('includes the JSON-only guardrails and required sections', () => {
    const prompt = buildNoticeAnalysisPrompt({
      noticeText: 'You must give 60 days notice before the lease end date.',
      leaseContext: 'Lease renews month to month after the fixed term.',
      renterContext: 'The renter may move for work.',
      questions: 'Does email count as written notice?'
    });

    expect(prompt.systemPrompt).toContain('Return strict JSON only');
    expect(prompt.systemPrompt).toContain('not legal advice');
    expect(prompt.systemPrompt).toContain('timeline');
    expect(prompt.systemPrompt).toContain('replyDraft');
    expect(prompt.systemPrompt).toContain("renter's stated questions");
    expect(prompt.userPrompt).toContain('60 days notice');
    expect(prompt.userPrompt).toContain('Does email count as written notice?');
    expect(prompt.userPrompt).toContain('aligned to the renter context and user questions');
  });
});
