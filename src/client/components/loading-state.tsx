export function LoadingState() {
  return (
    <div className="panel card loading-state" role="status" aria-live="polite">
      <div className="loading-header">
        <div className="loading-pulse" />
        <div className="card-heading">
          <p className="eyebrow">Analysis in progress</p>
          <h2>Reviewing the notice</h2>
          <p>
            Checking for deadlines, obligations, missing details, and a renter-safe reply draft. This can take a few
            seconds.
          </p>
        </div>
      </div>

      <ul className="loading-checklist" aria-label="Analysis steps">
        <li>Reading the notice language and any quoted lease terms</li>
        <li>Pulling out likely deadlines, obligations, and ambiguity</li>
        <li>Drafting a clear response you can copy and adapt</li>
      </ul>
    </div>
  );
}
