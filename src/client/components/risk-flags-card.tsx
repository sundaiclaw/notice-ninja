import type { RiskFlag } from '../../shared/types';

type RiskFlagsCardProps = {
  riskFlags: RiskFlag[];
};

export function RiskFlagsCard({ riskFlags }: RiskFlagsCardProps) {
  return (
    <div className="panel card">
      <div className="card-heading">
        <p className="eyebrow">Risk flags</p>
        <h2>Ambiguity and cautions</h2>
      </div>
      {riskFlags.length === 0 ? (
        <p className="supporting-copy">No major risks were identified from the provided text.</p>
      ) : (
        <ul className="stack-list">
          {riskFlags.map((risk) => (
            <li key={`${risk.title}-${risk.severity}`} className="list-card list-card-risk">
              <div className="list-card-header">
                <h3>{risk.title}</h3>
                <span className={`pill pill-severity-${risk.severity}`}>{risk.severity} severity</span>
              </div>
              <p>{risk.detail}</p>
              <p>
                <strong>Mitigation:</strong> {risk.mitigation}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
