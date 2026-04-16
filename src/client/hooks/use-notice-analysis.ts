import { useCallback, useState } from 'react';

import type { NoticeAnalysisRequest, NoticeAnalysisResponse } from '../../shared/types';
import { analyzeNotice as analyzeNoticeRequest } from '../lib/api';

export function useNoticeAnalysis() {
  const [result, setResult] = useState<NoticeAnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAnalysis = useCallback(async (input: NoticeAnalysisRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const analysis = await analyzeNoticeRequest(input);
      setResult(analysis);
      return analysis;
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Could not analyze the notice.';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    result,
    isLoading,
    error,
    setError,
    submitAnalysis
  };
}
