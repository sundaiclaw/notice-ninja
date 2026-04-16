type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

function getErrorGuidance(message: string) {
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes('failed to fetch') ||
    normalizedMessage.includes('network') ||
    normalizedMessage.includes('load failed')
  ) {
    return {
      summary: 'The app could not reach the analysis service.',
      steps: [
        'Make sure the app server is running and this tab still has a connection.',
        'Try the request again after the page finishes loading.',
        'If you use a local setup, confirm the browser can reach /api/analyze on the same host.'
      ]
    };
  }

  if (
    normalizedMessage.includes('openrouter') ||
    normalizedMessage.includes('api key') ||
    normalizedMessage.includes('model') ||
    normalizedMessage.includes('configuration')
  ) {
    return {
      summary: 'The AI analysis service needs attention before this review can finish.',
      steps: [
        'Check the OpenRouter API key, base URL, and model environment variables.',
        'Verify the configured model is available and the account has access.',
        'After updating the configuration, retry the analysis.'
      ]
    };
  }

  if (normalizedMessage.includes('schema') || normalizedMessage.includes('request body')) {
    return {
      summary: 'The submitted notice details looked incomplete or invalid.',
      steps: [
        'Paste the full landlord message or clause instead of a partial excerpt.',
        'Keep the required notice field filled in before retrying.',
        'If the issue repeats, remove unusual formatting and try a simpler paste.'
      ]
    };
  }

  return {
    summary: 'The notice review ran into a temporary issue.',
    steps: [
      'Retry the analysis in a moment.',
      'If the notice is very long, try pasting only the most relevant clause or message thread.',
      'If the issue keeps happening, review the server logs and OpenRouter settings.'
    ]
  };
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const guidance = getErrorGuidance(message);

  return (
    <div className="panel card error-state" role="alert">
      <div className="card-heading">
        <p className="eyebrow">Analysis issue</p>
        <h2>Analysis could not be completed</h2>
        <p>{guidance.summary}</p>
      </div>

      <ul className="bulleted-list error-guidance">
        {guidance.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>

      <p className="supporting-copy error-detail">Reported detail: {message}</p>

      {onRetry ? (
        <div className="error-actions">
          <button type="button" className="primary-button" onClick={onRetry}>
            Try again
          </button>
        </div>
      ) : null}
    </div>
  );
}
