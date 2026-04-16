IDEATION OUTPUT
Title: Notice Ninja
Description: AI turns lease clauses and landlord messages into notice deadlines, move-out checklists, and a reply draft.

Spec Seed:
- What it does: Notice Ninja helps renters make sense of lease clauses, renewal notices, and landlord messages. It extracts likely deadlines, obligations, ambiguity, and risk flags, then turns that into a clear checklist and a reply draft.
- Who it's for: Renters navigating lease renewals, move-out notices, deposits, or landlord communication.
- Core job: When housing-related notice language feels stressful and unclear, I want a practical action plan and message draft, so I can respond without missing something important.
- Current alternative: People re-read lease language, search forums, text friends, and draft landlord emails from scratch while worrying they misunderstood the deadline.
- Key differentiator: It combines deadline extraction, risk surfacing, obligation checklists, and response drafting in one flow.
- AI integration: AI parses lease/notice text, identifies likely obligations and uncertainty, builds a timeline/checklist, and writes the landlord-facing reply.
- Demo flow: Paste the notice; add renter context; generate the plan; inspect deadlines/checklist/risks; copy the reply draft.
- Tech stack suggestion: React + TypeScript frontend, Node/Express backend, OpenRouter free model integration.
- Riskiest assumption: Users may over-trust it as legal advice; mitigate with explicit caveats, confidence framing, and clear uncertainty callouts.
Engagement hook: Paste a confusing landlord message and get your smartest next move in seconds.

Design Direction:
- Visual style: calm utility dashboard
- Reference design system: Linear-style clarity with civic-service trust cues
- Color palette: #0F172A, #059669, #F59E0B, #F8FAFC, #CBD5E1
- Font pairing: Space Grotesk + Inter
- Layout: single page scroll
- Key polish target: the action-plan panel should feel reassuring, clear, and deadline-focused

Change name:
- notice-ninja-launch
