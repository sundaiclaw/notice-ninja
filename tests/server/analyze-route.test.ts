import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../../src/server/app';

describe('POST /api/analyze', () => {
  it('returns a typed analysis payload', async () => {
    const app = createApp({
      analyzeNotice: async () => ({
        summary: {
          situation: 'The renter likely owes a written notice before the lease ends.',
          confidence: 'medium',
          disclaimer: 'This is not legal advice.'
        },
        timeline: [
          {
            title: 'Send written notice',
            dateText: 'At least 30 days before move-out',
            confidence: 'medium',
            basis: 'The pasted clause mentions a 30-day notice window.',
            caveat: 'Assumes the clause applies to the current lease term.'
          }
        ],
        checklist: [
          {
            task: 'Send the notice in writing',
            priority: 'high',
            category: 'notice',
            reason: 'The clause requires written notice.',
            evidence: '“Tenant shall provide written notice 30 days before move-out.”'
          }
        ],
        riskFlags: [
          {
            title: 'Delivery method unclear',
            severity: 'medium',
            detail: 'The clause does not say whether email is acceptable.',
            mitigation: 'Ask the landlord what delivery method they require.'
          }
        ],
        missingInformation: ['Jurisdiction'],
        questionsToConfirm: ['Does the landlord accept email notice?'],
        replyDraft: {
          subject: 'Confirming notice requirements',
          message: 'Hi, I want to confirm the required notice timing and delivery method.'
        }
      })
    });

    const response = await request(app).post('/api/analyze').send({
      noticeText: 'Tenant shall provide written notice 30 days before move-out.'
    });

    expect(response.status).toBe(200);
    expect(response.body.summary.situation).toContain('written notice');
    expect(response.body.timeline).toHaveLength(1);
  });

  it('returns a 400 for invalid input', async () => {
    const app = createApp({
      analyzeNotice: async () => {
        throw new Error('should not be called');
      }
    });

    const response = await request(app).post('/api/analyze').send({ noticeText: '  ' });

    expect(response.status).toBe(400);
    expect(response.body.error.message).toContain('schema');
  });

  it('returns a JSON 400 for malformed JSON bodies', async () => {
    const app = createApp({
      analyzeNotice: async () => {
        throw new Error('should not be called');
      }
    });

    const response = await request(app)
      .post('/api/analyze')
      .set('Content-Type', 'application/json')
      .send('{"noticeText":');

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toContain('application/json');
    expect(response.body.error.message).toBe('Request body must be valid JSON.');
  });
});
