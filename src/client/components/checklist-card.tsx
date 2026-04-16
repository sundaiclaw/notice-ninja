import type { ChecklistItem } from '../../shared/types';

type ChecklistCardProps = {
  checklist: ChecklistItem[];
};

export function ChecklistCard({ checklist }: ChecklistCardProps) {
  return (
    <div className="panel card">
      <div className="card-heading">
        <p className="eyebrow">Checklist</p>
        <h2>Recommended next actions</h2>
      </div>
      {checklist.length === 0 ? (
        <p className="supporting-copy">No checklist items were returned. Add more context if you want stronger guidance.</p>
      ) : (
        <ul className="stack-list">
          {checklist.map((item) => (
            <li key={`${item.task}-${item.category}`} className="list-card">
              <div className="list-card-header">
                <div>
                  <h3>{item.task}</h3>
                  <p className="meta-row">{item.category}</p>
                </div>
                <span className={`pill pill-priority-${item.priority}`}>{item.priority} priority</span>
              </div>
              <p>
                <strong>Reason:</strong> {item.reason}
              </p>
              <p>
                <strong>Evidence:</strong> {item.evidence}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
