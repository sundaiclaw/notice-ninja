import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ReplyDraftCard } from '../../src/client/components/reply-draft-card';

describe('ReplyDraftCard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    });
  });

  it('renders the draft and copies it with one click', async () => {
    render(
      <ReplyDraftCard
        replyDraft={{
          subject: 'Confirming move-out notice',
          message: 'Hi, I want to confirm the required notice timing and delivery method.'
        }}
      />
    );

    expect(screen.getByText(/confirming move-out notice/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /copy draft/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /copied/i })).toBeInTheDocument();
    });
  });
});
