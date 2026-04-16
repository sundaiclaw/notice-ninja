import { describe, expect, it } from 'vitest';

import { parseNoticeAnalysisResponse } from '../../src/server/services/response-parser';

describe('parseNoticeAnalysisResponse', () => {
  it('parses fenced JSON and fills safe defaults', () => {
    const parsed = parseNoticeAnalysisResponse(`\`\`\`json
{
  "summary": {
    "situation": "The renter likely needs to send written notice before moving out.",
    "confidence": "medium"
  },
  "replyDraft": {
    "message": "Hi, I want to confirm the written notice process."
  }
}
\`\`\``.replaceAll('\\`', '`'));

    expect(parsed.summary.situation).toContain('written notice');
    expect(parsed.timeline).toEqual([]);
    expect(parsed.checklist).toEqual([]);
  });

  it('throws when the payload is unusable', () => {
    expect(() => parseNoticeAnalysisResponse('not json at all')).toThrow(/Could not parse/);
  });
});
