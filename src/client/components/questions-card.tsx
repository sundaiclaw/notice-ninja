type QuestionsCardProps = {
  questionsToConfirm: string[];
};

export function QuestionsCard({ questionsToConfirm }: QuestionsCardProps) {
  return (
    <div className="panel card">
      <div className="card-heading">
        <p className="eyebrow">Follow-up questions</p>
        <h2>Questions to ask or verify</h2>
      </div>
      {questionsToConfirm.length === 0 ? (
        <p className="supporting-copy">No follow-up questions were suggested for this notice.</p>
      ) : (
        <ul className="bulleted-list">
          {questionsToConfirm.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
