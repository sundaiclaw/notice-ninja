import { Router } from 'express';
import { ZodError } from 'zod';

import { noticeAnalysisRequestSchema } from '../../shared/schema';
import type { NoticeAnalysisRequest, NoticeAnalysisResponse } from '../../shared/types';
import { BadRequestError, toErrorResponse } from '../lib/errors';
import { analyzeNotice } from '../services/notice-analysis';

export type AnalyzeNoticeHandler = (input: NoticeAnalysisRequest) => Promise<NoticeAnalysisResponse>;

export function createAnalyzeRouter(handler: AnalyzeNoticeHandler = analyzeNotice) {
  const router = Router();

  router.post('/', async (req, res) => {
    try {
      const input = noticeAnalysisRequestSchema.parse(req.body);
      const result = await handler(input);
      res.status(200).json(result);
    } catch (error) {
      const normalizedError =
        error instanceof ZodError
          ? new BadRequestError('Request body did not match the required schema.', error.flatten())
          : error;

      const { statusCode, body } = toErrorResponse(normalizedError);
      res.status(statusCode).json(body);
    }
  });

  return router;
}
