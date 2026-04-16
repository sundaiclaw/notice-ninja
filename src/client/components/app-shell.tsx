import type { ReactNode } from 'react';

type AppShellProps = {
  intake: ReactNode;
  results: ReactNode;
};

export function AppShell({ intake, results }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="hero-card">
        <div className="hero-layout">
          <div>
            <p className="eyebrow">Renter notice desk</p>
            <h1>Notice Ninja</h1>
            <p className="hero-copy">
              Paste a landlord message or lease clause, review the likely deadlines and obligations, then copy a calm
              reply draft.
            </p>
          </div>

          <aside className="hero-aside" aria-label="How Notice Ninja works">
            <p className="section-label">Workflow</p>
            <ol className="hero-steps">
              <li className="hero-step">
                <span className="hero-step-index">1</span>
                <div>
                  <strong>Paste the exact notice</strong>
                  <p>Include dates, fees, and quoted lease language when you have it.</p>
                </div>
              </li>
              <li className="hero-step">
                <span className="hero-step-index">2</span>
                <div>
                  <strong>Review the action plan</strong>
                  <p>See likely deadlines, checklist items, gaps, and risk flags in one place.</p>
                </div>
              </li>
              <li className="hero-step">
                <span className="hero-step-index">3</span>
                <div>
                  <strong>Send a calmer response</strong>
                  <p>Copy the draft reply, then adapt it before sending anything official.</p>
                </div>
              </li>
            </ol>
          </aside>
        </div>

        <div className="hero-chip-row" aria-label="Key outcomes">
          <span className="hero-chip">Likely deadlines with caveats</span>
          <span className="hero-chip">Move-out and renewal checklist</span>
          <span className="hero-chip">Copy-ready landlord reply</span>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="dashboard-column">
          <p className="section-label">Intake</p>
          {intake}
        </section>
        <section className="dashboard-column">
          <p className="section-label">Action plan</p>
          {results}
        </section>
      </main>
    </div>
  );
}
