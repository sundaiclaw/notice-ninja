import type { NoticeAnalysisRequest, NoticeAnalysisResponse } from '../../shared/types';
import { getServerConfig, type ServerConfig } from '../lib/env';
import { buildNoticeAnalysisPrompt } from './prompt-builder';
import { parseNoticeAnalysisResponse } from './response-parser';
import { requestOpenRouterCompletion, type ChatMessage } from './openrouter-client';

export type NoticeAnalysisDependencies = {
  getConfig?: () => ServerConfig;
  requestCompletion?: (config: ServerConfig, messages: ChatMessage[]) => Promise<string>;
};

export async function analyzeNotice(
  input: NoticeAnalysisRequest,
  dependencies: NoticeAnalysisDependencies = {}
): Promise<NoticeAnalysisResponse> {
  const { getConfig = getServerConfig, requestCompletion = requestOpenRouterCompletion } = dependencies;
  const config = getConfig();
  const prompt = buildNoticeAnalysisPrompt(input);
  const rawResponse = await requestCompletion(config, [
    { role: 'system', content: prompt.systemPrompt },
    { role: 'user', content: prompt.userPrompt }
  ]);

  return parseNoticeAnalysisResponse(rawResponse);
}
