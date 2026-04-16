import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ChecklistCard } from '../../src/client/components/checklist-card';
import { DisclaimerBanner } from '../../src/client/components/disclaimer-banner';
import { MissingInfoCard } from '../../src/client/components/missing-info-card';
import { QuestionsCard } from '../../src/client/components/questions-card';
import { RiskFlagsCard } from '../../src/client/components/risk-flags-card';
import { SummaryCard } from '../../src/client/components/summary-card';
import { TimelineCard } from '../../src/client/components/timeline-card';

describe('results cards', () => {
  it('renders the structured action-plan sections', () => {
    render(
      <div>
        <DisclaimerBanner disclaimer="This is not legal advice." />
        <SummaryCard
          summary={{
            situation: 'The lease likely requires written notice before move-out.',
            confidence: 'medium',
            disclaimer: 'This is not legal advice.'
          }}
        />
        <TimelineCard
          timeline={[
            {
              title: 'Send notice',
              dateText: '30 days before move-out',
              confidence: 'medium',
              basis: 'The pasted text says 30 days written notice.',
              caveat: 'Assumes the clause applies to the current term.'
            }
          ]}
        />
        <ChecklistCard
          checklist={[
            {
              task: 'Send written notice',
              priority: 'high',
              category: 'notice',
              reason: 'The clause specifically asks for written notice.',
              evidence: '“30 days written notice is required.”'
            }
          ]}
        />
        <RiskFlagsCard
          riskFlags={[
            {
              title: 'Delivery method unclear',
              severity: 'medium',
              detail: 'The notice does not say whether email counts.',
              mitigation: 'Confirm the required delivery method in writing.'
            }
          ]}
        />
        <MissingInfoCard missingInformation={['Jurisdiction']} />
        <QuestionsCard questionsToConfirm={['Does the landlord accept email notice?']} />
      </div>
    );

    expect(screen.getByText(/what this notice likely means/i)).toBeInTheDocument();
    expect(screen.getByText(/likely deadlines/i)).toBeInTheDocument();
    expect(screen.getByText(/recommended next actions/i)).toBeInTheDocument();
    expect(screen.getByText(/ambiguity and cautions/i)).toBeInTheDocument();
    expect(screen.getByText(/details worth confirming/i)).toBeInTheDocument();
    expect(screen.getByText(/questions to ask or verify/i)).toBeInTheDocument();
  });
});
