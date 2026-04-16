type MissingInfoCardProps = {
  missingInformation: string[];
};

export function MissingInfoCard({ missingInformation }: MissingInfoCardProps) {
  return (
    <div className="panel card">
      <div className="card-heading">
        <p className="eyebrow">Missing information</p>
        <h2>Details worth confirming</h2>
      </div>
      {missingInformation.length === 0 ? (
        <p className="supporting-copy">No missing facts were called out in the current analysis.</p>
      ) : (
        <ul className="bulleted-list">
          {missingInformation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
