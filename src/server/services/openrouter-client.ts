import OpenAI from 'openai';

import type { ServerConfig } from '../lib/env';
import { UpstreamServiceError } from '../lib/errors';

export type ChatMessage = {
  role: 'system' | 'user';
  content: string;
};

export async function requestOpenRouterCompletion(
  config: ServerConfig,
  messages: ChatMessage[]
): Promise<string> {
  try {
    const client = new OpenAI({
      apiKey: config.openRouterApiKey,
      baseURL: config.openRouterBaseUrl
    });

    const completion = await client.chat.completions.create(
      {
        model: config.openRouterModel,
        temperature: 0.2,
        messages
      },
      {
        signal: AbortSignal.timeout(45_000)
      }
    );

    const content = completion.choices[0]?.message?.content;

    if (typeof content === 'string' && content.trim()) {
      return content;
    }

    if (Array.isArray(content)) {
      const text = content
        .map((part) => ('text' in part ? part.text : ''))
        .join('')
        .trim();

      if (text) {
        return text;
      }
    }

    throw new UpstreamServiceError('OpenRouter returned an empty response.');
  } catch (error) {
    if (error instanceof UpstreamServiceError) {
      throw error;
    }

    const message = error instanceof Error ? error.message : 'Unknown upstream error';
    throw new UpstreamServiceError(`OpenRouter request failed: ${message}`);
  }
}
