import { ConfigError } from './errors';

export type ServerConfig = {
  port: number;
  openRouterApiKey: string;
  openRouterModel: string;
  openRouterBaseUrl: string;
};

export function getPort() {
  return Number.parseInt(process.env.PORT ?? '8080', 10);
}

export function getServerConfig(): ServerConfig {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY?.trim();
  const openRouterModel = process.env.OPENROUTER_MODEL?.trim();
  const openRouterBaseUrl = process.env.OPENROUTER_BASE_URL?.trim() ?? 'https://openrouter.ai/api/v1';

  if (!openRouterApiKey) {
    throw new ConfigError('OPENROUTER_API_KEY is required to analyze a notice.');
  }

  if (!openRouterModel) {
    throw new ConfigError('OPENROUTER_MODEL is required to analyze a notice.');
  }

  return {
    port: getPort(),
    openRouterApiKey,
    openRouterModel,
    openRouterBaseUrl
  };
}
