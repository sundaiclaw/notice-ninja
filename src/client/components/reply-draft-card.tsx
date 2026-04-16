import type { ReplyDraft } from '../../shared/types';
import { CopyButton } from './copy-button';

type ReplyDraftCardProps = {
  replyDraft: ReplyDraft;
};

export function ReplyDraftCard({ replyDraft }: ReplyDraftCardProps) {
  return (
    <div className="panel card reply-card">
      <div className="card-heading card-heading-row">
        <div>
          <p className="eyebrow">Reply draft</p>
          <h2>Copy and adapt before sending</h2>
        </div>
        <CopyButton text={replyDraft.subject ? `Subject: ${replyDraft.subject}\n\n${replyDraft.message}` : replyDraft.message} />
      </div>

      {replyDraft.subject ? <p className="draft-subject">Subject: {replyDraft.subject}</p> : null}
      <pre className="draft-message">{replyDraft.message}</pre>
    </div>
  );
}
