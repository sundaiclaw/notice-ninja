import type { TimelineItem } from '../../shared/types';

type TimelineCardProps = {
  timeline: TimelineItem[];
};

export function TimelineCard({ timeline }: TimelineCardProps) {
  return (
    <div className="panel card">
      <div className="card-heading">
        <p className="eyebrow">Timeline</p>
        <h2>Likely deadlines</h2>
      </div>
      {timeline.length === 0 ? (
        <p className="supporting-copy">No concrete deadline could be extracted from the provided text.</p>
      ) : (
        <ol className="stack-list timeline-list">
          {timeline.map((item) => (
            <li key={`${item.title}-${item.dateText}`} className="list-card">
              <div className="list-card-header">
                <div>
                  <h3>{item.title}</h3>
                  <p className="date-text">{item.dateText}</p>
                </div>
                <span className={`pill pill-${item.confidence}`}>{item.confidence}</span>
              </div>
              <p>
                <strong>Basis:</strong> {item.basis}
              </p>
              {item.caveat ? (
                <p>
                  <strong>Caveat:</strong> {item.caveat}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
