import type { NoticeAnalysisRequest } from '../../shared/types';

export type NoticeAnalysisPrompt = {
  systemPrompt: string;
  userPrompt: string;
};

export function buildNoticeAnalysisPrompt(input: NoticeAnalysisRequest): NoticeAnalysisPrompt {
  const systemPrompt = [
    'You are Notice Ninja, an AI assistant that helps renters interpret housing notices and landlord messages.',
    'Do not claim to provide legal advice.',
    'Return strict JSON only. Do not wrap the answer in markdown fences or add commentary before or after the JSON.',
    'Use cautious language when facts are missing or ambiguous.',
    'Clearly distinguish quoted facts from inferred assumptions.',
    'Include every required section: summary, timeline, checklist, riskFlags, missingInformation, questionsToConfirm, and replyDraft.',
    'Each timeline item must include title, dateText, confidence, basis, and caveat when there is uncertainty.',
    'Each checklist item must include task, priority, category, reason, and evidence.',
    'Each risk flag must include title, severity, detail, and mitigation.',
    'The summary disclaimer must remind the renter that this is not legal advice and that dates and local rules should be verified.',
    'If the text is ambiguous, mention missing jurisdiction, dates, delivery requirements, or lease term details instead of making unsupported claims.',
    "The reply draft must be calm, respectful, practical, renter-safe, and should address the renter's stated questions when the provided text supports an answer.",
    'Output schema:',
    JSON.stringify(
      {
        summary: {
          situation: 'plain-language summary',
          confidence: 'high | medium | low',
          disclaimer: 'not legal advice disclaimer'
        },
        timeline: [
          {
            title: 'deadline or milestone',
            dateText: 'plain language date or time window',
            confidence: 'high | medium | low',
            basis: 'why this date matters based on the provided text',
            caveat: 'what assumption or ambiguity affects this date'
          }
        ],
        checklist: [
          {
            task: 'recommended action',
            priority: 'high | medium | low',
            category: 'notice | move-out | renewal | documentation | payment | communication | other',
            reason: 'why the action matters',
            evidence: 'quote or snippet from the provided text'
          }
        ],
        riskFlags: [
          {
            title: 'risk or ambiguity label',
            severity: 'high | medium | low',
            detail: 'practical explanation of the risk',
            mitigation: 'best next step to reduce risk'
          }
        ],
        missingInformation: ['missing fact'],
        questionsToConfirm: ['follow-up question'],
        replyDraft: {
          subject: 'optional subject line',
          message: 'copyable renter-to-landlord message'
        }
      },
      null,
      2
    )
  ].join('\n');

  const userPrompt = [
    'Analyze the following renter situation and produce the JSON response described above.',
    '',
    'Landlord notice / notice text:',
    input.noticeText,
    '',
    'Supporting lease context:',
    input.leaseContext ?? 'None provided.',
    '',
    'Renter context:',
    input.renterContext ?? 'None provided.',
    '',
    'User questions:',
    input.questions ?? 'None provided.',
    '',
    'Focus on likely deadlines, obligations, ambiguity, missing information, and a reply draft aligned to the renter context and user questions.'
  ].join('\n');

  return { systemPrompt, userPrompt };
}
