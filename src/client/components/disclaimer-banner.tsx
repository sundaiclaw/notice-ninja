type DisclaimerBannerProps = {
  disclaimer: string;
};

export function DisclaimerBanner({ disclaimer }: DisclaimerBannerProps) {
  return (
    <div className="disclaimer-banner" role="note">
      <strong>Heads up:</strong> {disclaimer}
    </div>
  );
}
