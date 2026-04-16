import { ContextFields } from './context-fields';

export type NoticeIntakeValues = {
  noticeText: string;
  leaseContext: string;
  renterContext: string;
  questions: string;
};

type NoticeIntakeFormProps = {
  values: NoticeIntakeValues;
  isLoading?: boolean;
  onChange: (field: keyof NoticeIntakeValues, value: string) => void;
  onReset: () => void;
  onSubmit: () => void;
};

export function NoticeIntakeForm({ values, isLoading, onChange, onReset, onSubmit }: NoticeIntakeFormProps) {
  const isSubmitDisabled = isLoading || values.noticeText.trim().length === 0;
  const hasAnyInput = Object.values(values).some((value) => value.trim().length > 0);

  return (
    <div className="panel card intake-card" aria-busy={isLoading}>
      <div className="card-heading card-heading-row">
        <div>
          <h2>Paste the source text</h2>
          <p>
            Add the landlord message or notice first. The supporting fields help the analysis catch deadlines,
            obligations, and ambiguity.
          </p>
        </div>
        <span className={`status-badge ${isLoading ? 'status-badge-active' : 'status-badge-idle'}`}>
          {isLoading ? 'Review in progress' : 'Ready to review'}
        </span>
      </div>

      <form
        className="intake-form"
        onSubmit={(event) => {
          event.preventDefault();
          if (!isSubmitDisabled) {
            onSubmit();
          }
        }}
      >
        <label className="field-label" htmlFor="noticeText">
          Notice or landlord message <span className="required-mark">*</span>
        </label>
        <textarea
          id="noticeText"
          name="noticeText"
          className="textarea textarea-lg"
          rows={10}
          required
          disabled={isLoading}
          value={values.noticeText}
          onChange={(event) => onChange('noticeText', event.target.value)}
          placeholder="Paste the notice, landlord email, renewal terms, move-out instructions, or message thread here."
        />
        <p className="field-hint">
          Best results usually come from the full text, especially dates, fees, delivery methods, and quoted lease
          language.
        </p>

        <ContextFields
          leaseContext={values.leaseContext}
          renterContext={values.renterContext}
          questions={values.questions}
          disabled={isLoading}
          onFieldChange={onChange}
        />

        <div className="form-footer">
          <div>
            <p className="supporting-copy">
              Notice Ninja organizes the text you provide. It does not replace legal advice or local housing rules.
            </p>
            {isLoading ? <p className="status-copy">Keep this tab open while the analysis runs.</p> : null}
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button" disabled={isLoading || !hasAnyInput} onClick={onReset}>
              Clear fields
            </button>
            <button type="submit" className="primary-button" disabled={isSubmitDisabled}>
              {isLoading ? 'Analyzing notice…' : 'Analyze notice'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
