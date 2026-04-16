import { noticeAnalysisResponseSchema } from '../../shared/schema';
import type { NoticeAnalysisRequest, NoticeAnalysisResponse } from '../../shared/types';

export async function analyzeNotice(input: NoticeAnalysisRequest): Promise<NoticeAnalysisResponse> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'error' in payload && payload.error && typeof payload.error === 'object'
        ? String((payload.error as { message?: string }).message ?? 'Analysis failed.')
        : 'Analysis failed.';

    throw new Error(message);
  }

  return noticeAnalysisResponseSchema.parse(payload);
}
