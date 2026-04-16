import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'node:path';
import { existsSync } from 'node:fs';

import type { NoticeAnalysisRequest, NoticeAnalysisResponse } from '../shared/types';
import { createAnalyzeRouter } from './routes/analyze';
import { BadRequestError, toErrorResponse } from './lib/errors';

export type AnalyzeNoticeHandler = (
  input: NoticeAnalysisRequest
) => Promise<NoticeAnalysisResponse>;

export function createApp(options?: { analyzeNotice?: AnalyzeNoticeHandler }) {
  const app = express();
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexPath = path.join(distDir, 'index.html');

  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use('/api/analyze', createAnalyzeRouter(options?.analyzeNotice));

  if (existsSync(indexPath)) {
    app.use(express.static(distDir));
    app.use((req, res, next) => {
      if (req.method !== 'GET' || req.path.startsWith('/api') || req.path === '/health') {
        next();
        return;
      }

      res.sendFile(indexPath);
    });
  }

  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      next(error);
      return;
    }

    if (!req.path.startsWith('/api')) {
      next(error);
      return;
    }

    const normalizedError =
      isJsonParseError(error) ? new BadRequestError('Request body must be valid JSON.') : error;

    const { statusCode, body } = toErrorResponse(normalizedError);
    res.status(statusCode).json(body);
  });

  return app;
}

function isJsonParseError(error: unknown): error is Error & { type: 'entity.parse.failed' } {
  return (
    error instanceof Error &&
    'type' in error &&
    typeof error.type === 'string' &&
    error.type === 'entity.parse.failed'
  );
}
