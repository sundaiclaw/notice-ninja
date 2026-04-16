type ContextFieldsProps = {
  leaseContext: string;
  renterContext: string;
  questions: string;
  disabled?: boolean;
  onFieldChange: (field: 'leaseContext' | 'renterContext' | 'questions', value: string) => void;
};

export function ContextFields({
  leaseContext,
  renterContext,
  questions,
  disabled,
  onFieldChange
}: ContextFieldsProps) {
  return (
    <div className="field-group">
      <label className="field-label" htmlFor="leaseContext">
        Supporting lease language
      </label>
      <textarea
        id="leaseContext"
        name="leaseContext"
        className="textarea"
        rows={5}
        disabled={disabled}
        value={leaseContext}
        onChange={(event) => onFieldChange('leaseContext', event.target.value)}
        placeholder="Optional: paste the exact clause about renewal, notice timing, deposits, cleaning, or move-out steps."
      />

      <label className="field-label" htmlFor="renterContext">
        Renter context
      </label>
      <textarea
        id="renterContext"
        name="renterContext"
        className="textarea"
        rows={4}
        disabled={disabled}
        value={renterContext}
        onChange={(event) => onFieldChange('renterContext', event.target.value)}
        placeholder="Optional: mention move-out timing, renewal goals, travel plans, roommate changes, or anything making the notice stressful."
      />

      <label className="field-label" htmlFor="questions">
        Questions to answer
      </label>
      <textarea
        id="questions"
        name="questions"
        className="textarea"
        rows={3}
        disabled={disabled}
        value={questions}
        onChange={(event) => onFieldChange('questions', event.target.value)}
        placeholder="Optional: ask what deadline is most likely, what to send, or what to confirm in writing."
      />
    </div>
  );
}
