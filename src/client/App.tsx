import { useMemo, useState } from 'react';

import type { NoticeAnalysisRequest } from '../shared/types';
import { AppShell } from './components/app-shell';
import { ChecklistCard } from './components/checklist-card';
import { DisclaimerBanner } from './components/disclaimer-banner';
import { EmptyState } from './components/empty-state';
import { ErrorState } from './components/error-state';
import { LoadingState } from './components/loading-state';
import { MissingInfoCard } from './components/missing-info-card';
import { NoticeIntakeForm, type NoticeIntakeValues } from './components/notice-intake-form';
import { QuestionsCard } from './components/questions-card';
import { ReplyDraftCard } from './components/reply-draft-card';
import { RiskFlagsCard } from './components/risk-flags-card';
import { SummaryCard } from './components/summary-card';
import { TimelineCard } from './components/timeline-card';
import { useNoticeAnalysis } from './hooks/use-notice-analysis';

const initialValues: NoticeIntakeValues = {
  noticeText: '',
  leaseContext: '',
  renterContext: '',
  questions: ''
};

function toRequest(values: NoticeIntakeValues): NoticeAnalysisRequest {
  return {
    noticeText: values.noticeText,
    leaseContext: values.leaseContext || undefined,
    renterContext: values.renterContext || undefined,
    questions: values.questions || undefined
  };
}

export default function App() {
  const [values, setValues] = useState<NoticeIntakeValues>(initialValues);
  const { result, error, isLoading, submitAnalysis } = useNoticeAnalysis();

  const hasResult = useMemo(() => Boolean(result), [result]);

  const resultsContent = isLoading ? (
    <LoadingState />
  ) : error ? (
    <ErrorState
      message={error}
      onRetry={() => {
        void submitAnalysis(toRequest(values));
      }}
    />
  ) : hasResult && result ? (
    <div className="results-stack">
      <DisclaimerBanner disclaimer={result.summary.disclaimer} />
      <SummaryCard summary={result.summary} />
      <TimelineCard timeline={result.timeline} />
      <ChecklistCard checklist={result.checklist} />
      <RiskFlagsCard riskFlags={result.riskFlags} />
      <MissingInfoCard missingInformation={result.missingInformation} />
      <QuestionsCard questionsToConfirm={result.questionsToConfirm} />
      <ReplyDraftCard replyDraft={result.replyDraft} />
    </div>
  ) : (
    <EmptyState />
  );

  return (
    <AppShell
      intake={
        <NoticeIntakeForm
          values={values}
          isLoading={isLoading}
          onChange={(field, value) => {
            setValues((current) => ({ ...current, [field]: value }));
          }}
          onReset={() => {
            setValues(initialValues);
          }}
          onSubmit={() => {
            void submitAnalysis(toRequest(values));
          }}
        />
      }
      results={resultsContent}
    />
  );
}
