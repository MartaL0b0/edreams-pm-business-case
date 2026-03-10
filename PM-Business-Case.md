# EDreams Plus Services Business Case

Proposed solution by Marta Lobo de Pablos - March 13th 2026

## Context, Scope and Assumptions

Welcome to the Edreams Plus Services Business case. The following document (and accompanying HTML) contains the materials that are delivered as a result of the assignment.

This first section presents how this business case was approached.

### Validated Inputs (from HR instructions)

- Team mission: **Enhance the customer travel experience by delivering the most convenient and relevant Seat & Baggage offering.**
- Team objective: Increase seat and bag attach without hurting overall booking conversion.
- Team composition: 1 PM, 1 UX researcher/designer, 6 developers, 1 QA.

### Assumptions based on problem analysis

- Seat and baggage attach friction is caused by choice overload and weak relevance.
- A meaningful share of users buy one ancillary (e.g. seats) but skip the second (e.g. baggage) due to fragmented decision moments.
- Personalization and reduced decision effort can increase ancillary attach with neutral-to-positive conversion impact.
- Problem applies to both desktop and mobile web booking flows.
- Use of brand visuals from EDreams Odigeo (vs standalone EDreams) to make it market agnostic.

### Market Research and Evidence Used for Ideation

The two proposals were shaped using a mix of company evidence sources and external market references.

| Source | Type | Relevant signal | How it influenced this proposal |
|---|---|---|---|
| [EDreams mission and culture pages in brief](https://www.edreamsodigeocareers.com/about-us/) | Company context | Customer-centricity and convenience are explicit values. | Prioritized convenience-first, editable recommendations over aggressive upsell patterns. |
| [IdeaWorksCompany, 2024 CarTrawler Yearbook of Ancillary Revenue](https://ideaworkscompany.com/2024-cartrawler-yearbook-of-ancillary-revenue-report/) | Industry economics | Ancillary revenues are structurally important across airlines and growing. | Reinforced focus on seat+bag attach as a high-leverage revenue surface.|
| [IdeaWorksCompany, Eight Ideas We Admire to Boost Airline Revenue (2025)](https://ideaworkscompany.com/eight-ideas-we-admire-to-boost-airline-revenue-m-report/) | Industry practices | Reports highlight seat-map merchandising, in-path upsell, and low-friction value communication. | Inspired in-path recommendation design with one-tap apply and transparent rationale. |
| [IdeaWorksCompany, Jay Sorensen Busts 8 Airline Business Myths (2026)](https://ideaworkscompany.com/jay-sorensen-busts-8-airline-business-myths-report/) | Customer experience risks | Calls out complexity and low-empathy flows as profit and experience blockers. | Drove the requirement for clear language, easy edits, and non-tech-savvy-friendly UX. |
| [Baymard Institute checkout and mobile UX research collections](https://baymard.com/research/checkout-usability) | UX benchmark | Checkout friction and unnecessary decision burden reduce completion rates. | Drove the small-bet approach: smarter defaults (carryover) and fewer repeated decisions. |


### Cultural Values Alignment (EDreams-Specific)

This proposal explicitly maps to the values of EDreams as a Company, which should be used as decision filters in prioritization and rollout.

| EDreams value intent | How this business case reflects it | Potential Delivery checkpoint |
|---|---|---|
| [Customer obsession and travel convenience](https://www.edreamsodigeocareers.com/working-together/) | Both proposals reduce decision friction and preserve user control (edit/remove, transparent summary). | Usability test: >= 80% task success for seat+bag completion without assistance. |
| [Trust and clarity in customer interactions](https://www.edreamsodigeocareers.com/edo-life/) | "Why this recommendation" and explicit carryover confirmation avoid dark patterns. | Trust guardrail: no material increase in support contacts about unwanted extras. |
| [Operational excellence and ownership](https://www.edreamsodigeocareers.com/about-us/) | Pod operating model defines role ownership, dependency SLAs, and launch governance. | Weekly dependency board with signed status by Pricing, Ops, Analytics, Legal. |
| [Data-driven decisions and accountability](https://www.edreamsodigeocareers.com/about-us/) | A/B tests, clear go/no-go thresholds, and guardrail metrics are embedded per phase. | Decision gates at 10%, 50%, 100% rollout with pre-agreed stop conditions. |

Values links used:

- <https://www.edreamsodigeocareers.com/working-together/>
- <https://www.edreamsodigeocareers.com/edo-life/>
- <https://www.edreamsodigeocareers.com/about-us/>

### Technology involved

This project was completed using AI agentic technology that helped streamline and perform a larger amount of tasks in the required time to completion. While the ideas and the rational are original, some sections were drafted and then reviewed using AI capabilities. The UX functionality was also vibecoded using AI, as well as the [Readme file](README.md).

The AI tool used was Github Copilot in VS Code, with the model GPT-5.3-Codex and a customized Product Management productivity suite that I have finetuned for this task. Initial instructions to the model were provided in the [PM-Business-Case-instructions file](PM-Business-Case-instructions.md).

## How to approach the product definition: Design Thinking

Applying the Design Thinking methodology helps frame the product definition problem and approach it in a methodical way that can drive the different work phases.

The following steps are a summary of how this process can be conducted in more detail, although for the purpose of this exercise some steps were mocked.

### Phase 1. Empathize

- Analyze funnel data from flight selection -> seat step -> bag step -> payment.
- Conduct 8-12 user interviews (mix: solo, couple, family, business traveler).
- Review support contacts for seat/bag confusion and post-booking complaints.
- Benchmark competitor flows (Ryanair, easyJet, Booking, Skyscanner partners).

Outputs:

- Persona slices and JTBD statements.
- Top pain points by impact and frequency.
- Friction map for desktop/mobile flows.

### Phase 2. Define

Problem statement:

- "Travelers struggle to choose the right seat and baggage options quickly and confidently, causing missed ancillary attach and drop-off risk."

Opportunity statement:

- "If we make seat and baggage offers more relevant and easier to accept, we can improve attach rates while preserving booking conversion."

Success criteria:

- Primary: incremental seat+bag attach rate.
- Guardrail: no statistically significant decline in checkout conversion.

### Phase 3. Ideate

Generated opportunities:

- Personalized seat+bag bundles with one-tap apply.
- Smarter defaults for return leg and multi-leg trips.
- Contextual nudges based on trip type and party composition.

>**Selected for this exercise:**
>
>- 1 strategic feature (large): Smart Ancillary Concierge.
>- 1 smaller improvement: Next-Leg Smart Carryover.

### Phase 4. Prototype

- Low-fi wireframes for desktop/mobile.
- Experiment specs and event taxonomy.
- PRD and acceptance criteria for each proposal.

### Phase 5. Test

- A/B rollout in phases with conversion guardrails.
- Segment-level readouts (family vs solo, short-haul vs long-haul).
- Go/no-go gate after first statistically significant readout.

## First deliverable: Strategic/Large Feature

The Smart Ancillary Concierge (SAC) is a full new feature that brings strategic value to the ancillary selection within a flight purchase workflow.

### What is SAC

A personalized seat+baggage recommendation module in checkout that:

- Uses itinerary, traveler mix, and trip context to pre-compose a recommended seat+baggage package.
- Shows clear "Why this is recommended" reasons (for trust and relevance).
- Enables one-tap apply with immediate editable breakdown (no lock-in).
- Supports desktop and mobile web with parity.

Example recommendation:

- "Recommended for your 7-day family trip: 2 checked bags + standard seat grouping."

#### Recommended Module Capabilities

- 1: contextual bundle recommendation (seat + baggage) with one primary and one fallback option.
- 2: explainability panel ("Why this is recommended") listing top 2-3 drivers.
- 3: confidence-aware recommendation where low-confidence cases show conservative/default guidance.
- 4: one-tap apply with immediate cart update and side-by-side savings/convenience messaging.
- 5: quick customization controls (bag weight swap, seat zone change, remove one component).
- 6: segment-aware nudges (family, couple, solo, business) with concise copy variants.

#### Conditions and Signals the Module Could Analyze

The module can score candidate ancillary combinations using explainable, non-sensitive travel context.

| Condition / Signal | Example Buckets | Recommendation Effect |
|---|---|---|
| Trip length | 1-2 days, 3-5 days, 6-10 days, 10+ days | • Longer trips bias toward checked bag options • Shorter trips bias toward cabin-only defaults |
| Party size | Solo, 2 travelers, 3-4, 5+ | Larger parties bias toward seat-together suggestions and family-friendly bag bundles. |
| Destination type | Beach, city, winter/ski, long-haul hub | Destination profile adjusts expected luggage needs and seat comfort recommendations. |
| Time of year | Peak summer, shoulder season, winter holidays | Seasonal demand can shift bag needs and value messaging (for example, winter gear periods). |
| Expected weather (trip window) | Mild, hot, rainy, cold/snow | Weather-informed hints can increase relevance of baggage recommendations. |
| Flight duration and route shape | • Short-haul, medium-haul, long-haul • Direct vs multi-leg | Longer or multi-leg itineraries can prioritize comfort seats and robust baggage options. |
| Fare family constraints | Basic/economy/flex and included allowances | • Avoid recommending options already included in fare • Reduce redundant offers |
| Historical behavior (if available and consented) | Previously purchased seat type/bag type | Use prior preference as tie-breaker, not as the sole decision driver. |

Note:

- Sensitive or restricted attributes should not be used. Keep logic auditable and easy to explain to users.

#### Example Recommendation Logic (Readable Rule Layer)

- Rule example A: if trip length >= 6 days and party size >= 2, prioritize checked bag bundle + adjacent standard seats.
- Rule example B: if short-haul + 1-2 day trip + solo traveler, prioritize cabin bag + standard seat, with premium seat as optional upsell.
- Rule example C: if return leg is multi-leg and weather profile indicates winter conditions, increase rank of larger baggage options.

For initial MVP we should have a set of pre-defined rules, but as a interative improvement we could create a Reinforcement Learning module that learns from usage patterns and updates rules for future uses.

### Why should we build SAC

- Users abandon or skip ancillaries when decisions feel complex and disconnected.
- A guided, editable recommendation can reduce cognitive load while increasing ancillary confidence.

#### Use-case examples behind this idea:

- Expected support/research signal: travelers ask for clearer bag guidance by trip type.
- Expected behavioral signal: higher hesitation time on ancillary step for family and multi-passenger bookings.
- External inspiration: industry examples of in-path seat merchandising and benefit comparison suggest that relevance + clarity can lift attach.

#### Customer Feedback to be validated in the earlier stages of product definition:

- Theme 1: "I do not know which bag option is right for this trip."
  - Use case: leisure traveler with 5-8 day trip, uncertain between cabin-only and checked bag.
  - Product implication: guided recommendation with "why this" explanation.
- Theme 2: "I selected outbound options and had to do it all again for return."
  - Use case: round-trip customer repeats the same seat and bag choices on return leg.
  - Product implication: return-leg smart carryover defaults with easy edit/remove.
- Theme 3: "I am worried extras are being added without me noticing."
  - Use case: price-sensitive traveler with low trust for auto-applied ancillaries.
  - Product implication: explicit confirmation text, visible controls, and clear order summary updates.
- Theme 4: "I want to sit together with my companion but do not know the best option quickly."
  - Use case: couple/family traveler prioritizing seating proximity.
  - Product implication: seat recommendation contextualized by party size and trip profile.

#### Business benefit evaluation:

- Measure incremental attach rate uplift vs control.
- Measure ancillary revenue per booking (ARPB) uplift.
- Enforce conversion guardrails to avoid checkout harm.



### How would we build SAC

#### Stakeholders

- Plus Services Pod: PM, UX, FE/BE devs, QA.
- Data Science/Analytics: recommendation logic and experiment readout.
- Revenue Management/Pricing: package logic and constraints.
- Airline Content/Operations: seat and bag inventory rules.
- Legal/Compliance: personalization transparency and consent implications.
- Customer Support: expected contact drivers and escalation prep.

#### Success Metrics

Primary:

- Seat+bag combined attach rate (% of bookings with both).

Supporting:

- Seat attach rate.
- Baggage attach rate.
- Ancillary revenue per booking.
- Recommendation acceptance rate.

Guardrails:

- Checkout conversion rate.
- Checkout completion time.
- Customer support contact rate related to ancillaries.

#### Key Risks and Mitigations

- Risk: irrelevant recommendations reduce trust.
  - Mitigation: clear rationale text, easy edit path, conservative initial targeting.
- Risk: conversion drop from added UI complexity.
  - Mitigation: progressive disclosure and strict A/B guardrails.
- Risk: model bias toward higher-priced ancillaries.
  - Mitigation: fairness checks and value framing not only price maximization.

#### Development Team Involvement

- Pod-size execution model for Strategic feature (8-person pod):
- PM: owns scope, dependency sequencing, decision gates, and experiment go/no-go.
- UX researcher/designer: owns recommendation UX, copy clarity, and usability validation loops.
- FE developers (3 assumed):
  - FE-1: recommendation card UI and order-summary interactions.
  - FE-2: explainability, edit/remove flows, and mobile parity.
  - FE-3: experiment flags, event instrumentation hooks, and performance tuning.
- BE developers (3 assumed):
  - BE-1: recommendation orchestration API and fallback logic.
  - BE-2: inventory/fare constraint resolver and equivalent option mapping.
  - BE-3: analytics event pipeline integration and observability.
- QA engineer: test strategy for experiment integrity, edge cases, cross-device behavior, and rollback readiness.

#### External Dependencies the PM Must Manage (Strategic feature)

- Revenue Management/Pricing: package rules, fare constraints, and margin guardrails.
- Airline Content/Operations: seat-map and baggage rule consistency by carrier/route.
- Data/Analytics platform: event schema approval, dashboard readiness, and experiment readout SLA.
- Legal/Compliance: personalization transparency, consent/legal copy, and market-specific constraints.
- Customer Support: macro updates, escalation playbook, and trust-related feedback tagging.

#### Engineering Design Hypotheses to Investigate

Hypothesis 1: Hybrid decisioning architecture (rules first, ML ranking second)

- Idea: start with deterministic business rules to filter invalid/redundant options, then rank remaining options with a lightweight model.
- Why investigate: gives fast time-to-market with control and explainability, while allowing gradual performance improvement.
- What to test: offline replay on historical bookings + online A/B against rules-only baseline.

Hypothesis 2: Real-time recommendation API with graceful fallback cache

- Idea: recommendation service returns top options in <150ms p95, with precomputed fallback suggestions by route/segment when service degrades.
- Why investigate: protects checkout reliability and conversion guardrails under latency or dependency failures.
- What to test: load testing at peak traffic and chaos testing for downstream inventory/API failures.

### MVP Scope for SAC

Phase 1 (Must-have, MVP)

- Rule-based recommendation for top segments only: solo, couple, family.
- Inputs limited to high-signal conditions: trip length, party size, flight duration, fare constraints.
- One primary recommendation + one fallback option.
- "Why this recommendation" text with 1-2 simple drivers.
- One-tap apply, edit/remove controls, and full order-summary transparency.
- Basic A/B test setup with required event tracking and conversion guardrails.
- Fallback to existing ancillary flow on service failure.

Phase 2 (Should-have)

- Add destination type, seasonality, and weather signals.
- Expand recommendation variants by route archetype (short-haul city break, long-haul family, etc.).
- Confidence score with low-confidence conservative mode.
- Dynamic copy optimization by segment.
- Better fallback ranking using recent booking trends.

Future (Could-have)

- Hybrid rules + ML ranking in production with continuous retraining cadence.
- Per-user preference memory (with consent) and cross-session continuity.
- Multi-objective optimization balancing attach, margin, and trust signals.
- Experimentation on UI placement and bundling strategy by market.

Out of MVP (explicitly excluded from Phase 1)

- Native app rollout.
- Fully automated personalization without user-editable controls.
- Complex multi-city optimization and post-booking ancillary orchestration.

---

## Second Deliverable: Smaller Improvement

The smaller proposal is called the Next-Leg Smart Carryover, and aims to build over existing functionality for a quick-win (_low-hanging fruit_).

### What is the Next-Leg Smart Carryover

When a user selects seat/baggage on outbound leg:

- Pre-fill equivalent choices for other flights (legs) by default.
- Show concise confirmation: "Applied to all flights - edit anytime."
- Handle unavailable equivalents by auto-selecting nearest valid option and flagging clearly.
- Applicable to return flights and multi-flight itineraries.

#### Market Research and Evidence

Why this problem is worth solving now:

- Checkout UX benchmarks consistently show that repeated inputs and unnecessary decision steps increase friction and abandonment risk.
- Airline ancillary research indicates that in-path, low-friction merchandising patterns are more effective than delayed/post-booking prompts.
- Industry context shows ancillary revenue remains a major lever, so reducing avoidable friction in seat/bag flows is high-impact.
- **EDreams already performs smart carryover for return flights, but not for multi-flight itineraries**.

Reference links:

- <https://baymard.com/blog/current-state-of-checkout-ux>
- <https://baymard.com/research/checkout-usability>
- <https://ideaworkscompany.com/eight-ideas-we-admire-to-boost-airline-revenue-m-report/>
- <https://ideaworkscompany.com/2024-cartrawler-yearbook-of-ancillary-revenue-report/>

### Why should we build the Next-Leg Smart Carryover

- Round-trip users repeat similar decisions; repeating manually creates friction and missed attach.
- Smart carryover reduces effort and improves completion speed.

#### Use-case examples behind this idea:

- Expected support/research signal: complaints about re-entering similar ancillary choices for return leg.
- Expected behavioral signal: drop-off or delay at return ancillary step after outbound selection was already completed.
- UX benchmark inspiration: checkout best practices generally favor intelligent defaults with clear reversibility.

#### Customer feedback to be validated in the earlier stages of product definition:

- Theme 1: "I already selected this on outbound, why do I need to do it again?"
  - Validation source: support tags, post-booking feedback, usability tests.
- Theme 2: "I worry the system adds extras I did not choose."
  - Validation source: cancellation/modification reasons and trust-related comments.
- Theme 3: "I cannot tell if the return option is equivalent to outbound."
  - Validation source: confusion clicks, high edit rate, and step dwell-time spikes.
- Theme 4: "On mobile this step feels too long for simple repeat choices."
  - Validation source: mobile funnel drop-off and rage-tap/session replay signals.

#### Business benefit evaluation:

- Incremental lift in return-leg seat and bag attach.
- Reduced drop-off on ancillary steps.
- Neutral/positive checkout conversion.


### How would we build the Next-Leg Smart Carryover

#### Stakeholders

- Plus Services Pod: owns product scope, UX decisions, and end-to-end delivery of the carryover experience.
- Inventory/airline rules integration owner: ensures equivalent seat and bag mappings are valid across legs and carrier constraints.
- Analytics team: required to design experiment segmentation, validate impact by cohort, and support go/no-go rollout decisions. This can also be done at the Pod level if no analytics team is available but the tooling is, having the PM as decision maker.
- Customer Support team that gathers customer feedback to inform experiment results and feature iterations.

#### Success Metrics

Primary:

- Return-leg ancillary attach rate.

Supporting:

- Ancillary step completion time.
- Edit rate after carryover (quality signal).

Guardrails:

- Checkout conversion.
- Error rate from unavailable equivalent options.

#### Key Risks and Mitigations

- Risk: users feel "auto-added" without control.
  - Mitigation: transparent messaging and prominent edit/remove control.
- Risk: inventory mismatch across legs.
  - Mitigation: graceful fallback mapping with user notification.

#### Pod-size execution model for Smart Carryover (quick win stream)

- PM + UX + 2 FE + 1 BE + QA as core squad for 1-2 sprints.
- Remaining 2 BE + 1 FE continue foundational work for Strategic feature (instrumentation and API scaffolding).
- FE focus: return-leg carryover UI, transparent messaging, and one-tap edit/remove patterns.
- BE focus: outbound-to-return equivalence mapping service and fallback behavior.
- QA focus: regression on checkout flow, inventory mismatch scenarios, and mobile friction checks.

#### External Dependencies the PM Must Manage

- Inventory/content owners: equivalent-option mappings and fallback business rules by airline.
- Analytics team: segmented A/B readout for round-trip cohorts.
- Customer Support: trust/auto-add complaint monitoring and rapid feedback loop during rollout.

#### Implementation Alternatives (and which one to prioritize)

##### Alternative 1: Auto-Apply with Explicit Undo (Recommended)

- Behavior: system pre-fills and auto-applies equivalent return options, then displays a clear confirmation with one-tap edit/remove.
- Pros:
  - Lowest interaction cost and fastest completion.
  - Highest expected attach lift because default is already set.
  - Strong fit with mission of convenience.
- Cons:
  - Higher trust risk if messaging is not explicit.
  - Requires robust fallback logic for non-equivalent inventory.

##### Alternative 2: Suggested Carryover (User Must Confirm)

- Behavior: system proposes equivalent options but does not apply until user taps "Use outbound choices".
- Pros:
  - Lower perceived risk of unwanted extras.
  - Simpler compliance and transparency posture.
- Cons:
  - Additional click and decision step reduce convenience.
  - Lower expected attach and speed gains vs auto-apply.

##### Prioritization decision:

- Prioritize Alternative 1 (Auto-Apply with Explicit Undo) for MVP experimentation.
- Justification:
  - Better aligns with team mission (most convenient and relevant experience).
  - Highest upside for attach and completion speed in round-trip flows.
  - Risk is manageable with guardrails: prominent confirmation, easy undo, control group testing, and strict conversion/trust monitors.

Experiment plan for prioritization validation:

- Test A: Alternative 1 vs control.
- Test B: Alternative 1 vs Alternative 2 for sensitive segments/markets.
- Decision threshold: keep Alternative 1 if it improves return-leg attach and step time with no significant conversion decline and no material rise in support contacts.


## Pod Operating Model: Roles and Success Metrics

This operating model aligns delivery scope with pod capacity: 1 PM, 1 UX, 6 developers, 1 QA.

### Role Ownership and Success Metrics

| Team Member | Primary Ownership | Success Metrics (Delivery + Impact) |
|---|---|---|
| PM (1) | Strategy, prioritization, dependency management, experiment decisions | On-time milestone completion, dependency SLA adherence, attach uplift vs target, guardrail compliance, decision latency at gates |
| UX Researcher/Designer (1) | Discovery, interaction design, copy clarity, usability validation | Task success rate in usability tests, reduced step confusion signals, design cycle time, trust sentiment on recommendation/carryover interactions |
| FE Developer 1 | Ancillary UI components and interaction patterns | Defect escape rate, p95 interaction latency, implementation completeness for scoped stories |
| FE Developer 2 | Mobile parity and edit/remove flows | Mobile conversion parity, low UI regression rate, edit flow success rate |
| FE Developer 3 | Experiment flags, analytics hooks, performance hardening | Event completeness accuracy, experiment integrity pass rate, performance budget adherence |
| BE Developer 1 | Recommendation/carryover orchestration API | API reliability (error rate), p95 latency, fallback invocation correctness |
| BE Developer 2 | Rules engine and equivalence mapping | Mapping accuracy, low invalid-option exposure, reduced checkout blocking errors |
| BE Developer 3 | Data pipeline and observability | Event pipeline freshness, dashboard readiness before launch, alerting coverage for key failures |
| QA Engineer (1) | Test strategy, automation, release quality gate | Critical defect leakage, test coverage of high-risk scenarios, rollback readiness and mean time to detect |

### Suggested Delivery Cadence (Capacity-Aware)

- Track 1 (Quick win): Smart Carryover ships first in 1-2 sprints to capture near-term uplift.
- Track 2 (Foundation): in parallel, build SAC instrumentation and API contracts.
- Track 3 (Strategic rollout): SAC MVP experiment starts after dependency sign-off and baseline data quality checks.

### PM Dependency Governance Plan

- Weekly dependency review with Pricing, Content/Operations, Analytics, and Legal.
- Pre-launch checklist with explicit sign-offs: pricing rules, legal copy, instrumentation quality, support readiness.
- Launch-day command channel including PM, tech lead, QA, analytics, and support operations.
- 48-hour and 7-day post-launch reviews focused on guardrails and trust signals.

## Product Development Requirements

| Row | Smart Ancillary Concierge | Next-Leg Smart Carryover |
| --- | --- | --- |
| Objective | Increase combined seat+baggage attach by improving relevance and reducing decision effort, without conversion decline. | Improve next-leg ancillary attach and reduce friction by carrying selections from the first configured leg to subsequent eligible legs. |
| In Scope | • Recommendation module in ancillary flow • One-tap apply + editable breakdown • Recommendation rationale text • A/B testing and event instrumentation | • Auto-carryover logic across return and multi-leg itineraries • Clear messaging and edit controls • Fallback handling for unavailable equivalents |
| Out of Scope | • Native app implementation • Full ML optimization beyond rule-assisted model • Post-booking re-marketing experiences | • Post-booking modification orchestration |
| User Stories | • As a traveler, I want a recommended seat+bag option to decide quickly. • As a traveler, I want to understand why it is recommended. • As a traveler, I want to edit options before paying. | • As a traveler, I want previously selected ancillaries copied to later legs to finish faster. • As a traveler, I want easy control to edit/remove any carried-over item. |
| Functional Requirements | • FR1: Generate recommendation from itinerary + traveler context • FR2: Show recommendation summary and rationale • FR3: One-tap apply updates summary instantly • FR4: User can modify/remove items • FR5: All interactions emit analytics events | • FR1: Propose carryover on subsequent legs after first-leg selection • FR2: Map to equivalent available options • FR3: Select and label nearest valid fallback when exact match is unavailable • FR4: User can keep, edit, or remove in one interaction |
| Non-Functional Requirements | • NFR1: Module load impact <150ms p95 on ancillary step • NFR2: Stable experiment assignment per session • NFR3: Mobile and desktop parity | • NFR1: No additional blocking API call beyond checkout threshold • NFR2: Robust error handling for inventory mismatch with user-safe fallback |
| Dependencies | • Pricing and inventory availability APIs • Experimentation platform • Tracking taxonomy and data pipeline readiness | • Inventory/content mapping rules • Analytics experimentation setup • Support playbook updates for trust/fallback messaging |
| Rollout Plan | • Phase 0: Dogfood + instrumentation certification • Phase 1: 10% traffic • Phase 2: 50% traffic if guardrails hold • Phase 3: 100% with segment tuning | • Sprint 1: Build + QA + internal validation • Sprint 2: Launch at 25% eligible traffic • Sprint 3: Scale to 50-100% based on conversion and trust guardrails |

## Visual Mockup Specifications

| Row | Smart Ancillary Concierge | Next-Leg Smart Carryover |
| --- | --- | --- |
| Objective | Make recommendations trustworthy, editable, and fast to apply. | Apply ancillary carryover across eligible legs with high trust and easy reversibility. |
| Required Components | • "Recommended for your trip" module header • Bundle card with seat + bag breakdown • "Why this" chips • Primary CTA `Apply Recommendation` • Secondary CTA `Customize` • Inline order-summary delta | • Confirmation banner "Copied from first leg - edit anytime" • Leg-level ancillary row showing carried-over seat and bag • Primary CTA `Keep` • Secondary CTA `Edit` • Fallback disclosure when exact option is unavailable |
| States to Mock | • Default loaded state • Low-confidence state • API fallback state where default flow is shown | • Auto-apply success state • Equivalent-not-available state with closest match • User-undo state with remove/replace path |
| UX Acceptance Intent | • User understands rationale in <5 seconds • User edits recommendation in <=2 taps/clicks | • User recognizes carryover behavior without confusion • Undo/edit actions are visible without scrolling on mobile |
| Device Coverage | Desktop and mobile web variants for primary and fallback scenarios. | Desktop and mobile web variants across return and multi-leg itinerary flows. |
| Handoff Artifacts | Annotated wireframes, interaction notes, and copy variants for recommendation rationale. | Annotated wireframes, mapping/fallback messaging matrix, and undo/edit interaction notes. |

## Acceptance Criteria (Gherkin)

| Row | Smart Ancillary Concierge | Next-Leg Smart Carryover |
| --- | --- | --- |
| Display Trigger | Given user reaches ancillary step and recommendation inputs are available, then recommendation module is shown. | Given first-leg ancillary selection exists for a return or multi-leg booking, when user enters ancillary step for any next eligible leg, then equivalent choices are pre-filled. |
| Primary Action | Given recommendation is shown, when user taps `Apply Recommendation`, then seat and bag products are added and reflected in order summary. | Given carryover is shown, when user keeps defaults, then carried-over ancillaries remain applied and visible in order summary. |
| Edit/Remove Behavior | Given recommendation is applied, when user edits any component, then modified selection persists through payment. | Given carryover is pre-filled, when user edits/removes any component, then update is immediate and persists through payment. |
| Fallback Behavior | Given recommendation data fails to load, then system falls back to default ancillary UI with no blocking error. | Given exact equivalent is unavailable, when mapping runs, then nearest valid fallback is selected and clearly labeled. |
| Experiment/Control Behavior | Given user is in experiment control, then current flow is rendered with no recommendation module. | Given carryover logic fails, then user sees standard manual selection flow and can proceed without blocking errors. |
| Quality Guardrail | No statistically significant decline in checkout conversion during rollout phases. | No statistically significant decline in checkout conversion and no material increase in support contacts about unwanted extras. |

## Test Phase Development

| Item | Proposal |
|---|---|
| Test design | Run two coordinated A/B tests: (1) Smart Ancillary Concierge vs current flow, and (2) Next-Leg Smart Carryover vs current carryover behavior for eligible itineraries. |
| Traffic split | Start at 10% treatment / 90% control for 3-4 days, then move to 50/50 if no guardrail breach is detected. |
| Target segments | Segment results by party size (solo/couple/family), trip type (short-haul/long-haul), and itinerary type (round-trip/multi-leg). |
| Duration and sample | Keep each test live for at least 2 full booking cycles (minimum 14 days) and stop only after minimum sample size and significance thresholds are met. |
| Primary success metric | Incremental seat+bag attach rate (SAC) and incremental next-leg attach rate (Carryover). |
| Guardrails | Checkout conversion, checkout completion time, error rate on ancillary steps, and support contacts related to unwanted extras. |
| Decision gates | Continue rollout only if primary metric improves and no statistically significant guardrail deterioration is detected. |
| Operational cadence | Daily metric check during ramp-up, then twice-weekly product/analytics review with a formal go/no-go recommendation at the end of the test window. |
