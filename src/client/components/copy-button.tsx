import { useEffect, useState } from 'react';

import { copyText } from '../lib/copy';

type CopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');

  useEffect(() => {
    if (state !== 'copied') {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setState('idle'), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [state]);

  return (
    <button
      type="button"
      className="secondary-button"
      onClick={async () => {
        try {
          await copyText(text);
          setState('copied');
        } catch {
          setState('error');
        }
      }}
    >
      {state === 'copied' ? 'Copied' : state === 'error' ? 'Copy failed' : 'Copy draft'}
    </button>
  );
}
