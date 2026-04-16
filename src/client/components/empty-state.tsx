export function EmptyState() {
  return (
    <div className="panel card empty-state">
      <div className="card-heading">
        <p className="eyebrow">Action plan</p>
        <h2>Your action plan will appear here</h2>
        <p>
          Start with the exact landlord message or lease clause. Once you submit it, Notice Ninja turns the text into a
          practical renter desk: what it likely means, what to do next, and what to send back.
        </p>
      </div>

      <div className="empty-grid">
        <div className="list-card empty-tip-card">
          <h3>Best source text</h3>
          <p>Paste the full email, notice, text thread, or lease clause instead of a short summary.</p>
        </div>
        <div className="list-card empty-tip-card">
          <h3>Helpful context</h3>
          <p>Add your move-out timing, renewal goals, roommates, or any clauses that seem important.</p>
        </div>
        <div className="list-card empty-tip-card">
          <h3>What you will get</h3>
          <p>Likely deadlines, next-step checklist items, missing details to confirm, and a calm reply draft.</p>
        </div>
      </div>

      <ul className="empty-list">
        <li>Likely deadlines with confidence and caveats</li>
        <li>Move-out, renewal, or documentation checklist items</li>
        <li>Risk flags, ambiguity notes, and follow-up questions</li>
        <li>A respectful landlord reply you can copy and adapt</li>
      </ul>
    </div>
  );
}
