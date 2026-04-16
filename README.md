# Notice Ninja

Notice Ninja turns lease clauses and landlord messages into a calm, structured action plan: likely deadlines, checklist items, risk flags, missing-information prompts, and a renter-safe reply draft.

## What it does

- Lets renters paste a landlord notice, lease clause, or message thread
- Captures supporting lease context, renter context, and specific questions
- Uses AI to produce a structured notice timeline and next-step checklist
- Highlights uncertainty, ambiguity, and practical follow-up questions
- Generates a copyable reply draft without presenting itself as legal advice

## Stack

- React + TypeScript + Vite single-page dashboard
- Express API server in TypeScript
- Shared Zod schemas for request and response validation
- OpenRouter-backed AI analysis
- Bun for package management and scripts

## Prerequisites

- Bun 1.3+
- Node.js 22+ (for local runtime compatibility)
- An OpenRouter API key
- Optional for deploys: Google Cloud SDK authenticated to the target project

## Environment

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Required runtime variables:

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `OPENROUTER_BASE_URL`
- `PORT` (optional locally; defaults to `8080`)

## Install

```bash
bun install
```

## Run locally

Start the Vite client and Express server together:

```bash
bun run dev
```

Then open `http://localhost:5173`.

## Verification

```bash
bun run lint
bun run typecheck
bun run test
bun run build
```

To smoke-test the production server locally:

```bash
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1 \
OPENROUTER_MODEL=openrouter/auto \
OPENROUTER_API_KEY=your-key \
PORT=8080 \
bun run start
```

Health check:

```bash
curl http://localhost:8080/health
```

## Product flow

1. Paste the notice or landlord message in the left column.
2. Add optional lease language, renter context, and specific questions.
3. Run analysis.
4. Review the summary, timeline, checklist, risks, missing information, and reply draft.
5. Copy the draft and adapt it before sending.

## Important limitation

Notice Ninja is not legal advice. It is designed to help renters organize the provided text, surface likely obligations, and prepare follow-up questions when something is unclear.

## Deployment

Deploy to the reserved Cloud Run service:

```bash
GCP_PROJECT_ID=your-project-id \
GCP_REGION=us-central1 \
OPENROUTER_MODEL=openrouter/auto \
OPENROUTER_API_KEY_SECRET=projects/your-project-id/secrets/openrouter-api-key:latest \
./scripts/deploy.sh
```

If Secret Manager is not available, you can pass `OPENROUTER_API_KEY` directly instead.

## Published links

- Cloud Run URL: https://notice-ninja-859414203684.us-central1.run.app
- Sundai Project: https://www.sundai.club/projects/804d5caf-111f-4aca-aa88-f62aefbfbc20
- Repository: https://github.com/sundaiclaw/notice-ninja
