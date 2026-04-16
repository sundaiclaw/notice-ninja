#!/usr/bin/env bash
set -euo pipefail
: "${GCP_PROJECT_ID:?Set GCP_PROJECT_ID}"
: "${GCP_REGION:?Set GCP_REGION}"
gcloud run deploy notice-ninja \
  --source . \
  --project "$GCP_PROJECT_ID" \
  --region "$GCP_REGION" \
  --allow-unauthenticated
