import type { NoticeSummary } from '../../shared/types';

const confidenceLabelMap = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence'
} as const;

type SummaryCardProps = {
  summary: NoticeSummary;
};

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="panel card">
      <div className="card-heading card-heading-row">
        <div>
          <p className="eyebrow">Summary</p>
          <h2>What this notice likely means</h2>
        </div>
        <span className={`pill pill-${summary.confidence}`}>{confidenceLabelMap[summary.confidence]}</span>
      </div>
      <p className="body-copy">{summary.situation}</p>
    </div>
  );
}
