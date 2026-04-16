import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { NoticeIntakeForm } from '../../src/client/components/notice-intake-form';

describe('NoticeIntakeForm', () => {
  it('disables submit until notice text is present', () => {
    render(
      <NoticeIntakeForm
        values={{ noticeText: '', leaseContext: '', renterContext: '', questions: '' }}
        onChange={vi.fn()}
        onReset={vi.fn()}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /analyze notice/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /clear fields/i })).toBeDisabled();
  });

  it('submits with the provided values once notice text exists', () => {
    const onChange = vi.fn();
    const onReset = vi.fn();
    const onSubmit = vi.fn();

    render(
      <NoticeIntakeForm
        values={{
          noticeText: 'Please confirm whether 30 days notice is required.',
          leaseContext: 'The lease says notices must be written.',
          renterContext: 'Moving in June.',
          questions: 'Is email okay?'
        }}
        onChange={onChange}
        onReset={onReset}
        onSubmit={onSubmit}
      />
    );

    fireEvent.submit(screen.getByRole('button', { name: /analyze notice/i }).closest('form')!);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('clears the form when the clear action is selected', () => {
    const onReset = vi.fn();

    render(
      <NoticeIntakeForm
        values={{ noticeText: 'Notice text', leaseContext: '', renterContext: '', questions: '' }}
        onChange={vi.fn()}
        onReset={onReset}
        onSubmit={vi.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /clear fields/i }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
