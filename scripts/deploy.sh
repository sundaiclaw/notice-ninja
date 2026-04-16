#!/usr/bin/env bash
set -euo pipefail

: "${GCP_PROJECT_ID:?Set GCP_PROJECT_ID}"
: "${GCP_REGION:?Set GCP_REGION}"
: "${OPENROUTER_MODEL:?Set OPENROUTER_MODEL}"

BASE_URL="${OPENROUTER_BASE_URL:-https://openrouter.ai/api/v1}"
ENV_VARS="OPENROUTER_BASE_URL=$BASE_URL,OPENROUTER_MODEL=$OPENROUTER_MODEL"

if [[ -n "${OPENROUTER_API_KEY_SECRET:-}" ]]; then
  gcloud run deploy notice-ninja \
    --source . \
    --project "$GCP_PROJECT_ID" \
    --region "$GCP_REGION" \
    --allow-unauthenticated \
    --set-env-vars "$ENV_VARS" \
    --set-secrets "OPENROUTER_API_KEY=$OPENROUTER_API_KEY_SECRET"
elif [[ -n "${OPENROUTER_API_KEY:-}" ]]; then
  gcloud run deploy notice-ninja \
    --source . \
    --project "$GCP_PROJECT_ID" \
    --region "$GCP_REGION" \
    --allow-unauthenticated \
    --set-env-vars "$ENV_VARS,OPENROUTER_API_KEY=$OPENROUTER_API_KEY"
else
  echo "Set OPENROUTER_API_KEY_SECRET or OPENROUTER_API_KEY before deploying." >&2
  exit 1
fi
