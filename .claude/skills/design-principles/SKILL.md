---
name: design-principles
description: This skill should be used when the user asks to "review design", "check UI against Railway principles", "evaluate UX", "design review", "apply design cards", "walk through design principles", or mentions the 5 core values (Clear, Precise, Efficient, Durable, Delightful).
---

# Railway Design Principles

Railway solutions should be **Clear**, **Precise**, **Efficient**, **Durable**, and **Delightful**.

These qualities are reached progressively across iterations—starting functional and rough, becoming polished and delightful over time. Each card includes evaluation questions to surface gaps in how thoroughly a solution has been considered.

## The Five Values

### 1. CLEAR
Making complexity invisible through thoughtful organization and presentation.

| Card | Focus |
|------|-------|
| Place | Follow user workflow, not system structure |
| Clarity | Turn system complexity into user confidence |
| Purposeful Composition | Arrange elements with clear intent and visual harmony |
| Minimalism | Remove everything non-essential to reveal clarity |

### 2. PRECISE
Ensuring the interface accurately represents reality and maintains spatial coherence.

| Card | Focus |
|------|-------|
| Accurate Representation | Interface reflects capabilities, state, and behavior |
| Spatial Continuity | Maintain visual connection between interface states |
| Physical Authenticity | Physical-world elements behave realistically |

### 3. EFFICIENT
Reducing effort and friction to help users accomplish goals faster.

| Card | Focus |
|------|-------|
| Effort Reduction | Infer what you can, ask only what you must |
| Step Minimization | More steps mean fewer completions |
| Progressive Disclosure | Show only what's needed, when it's needed |

### 4. DURABLE
Building resilience and recoverability into every interaction.

| Card | Focus |
|------|-------|
| Error Recovery | Turn error states into recovery opportunities |
| Resilience | Make experimentation safe and consequence-free |
| Reversible Actions | Make mistakes fixable rather than preventable |

### 5. DELIGHTFUL
Creating moments of joy and craftsmanship that inspire.

| Card | Focus |
|------|-------|
| Ingenuity | "I haven't seen this before, but it makes perfect sense" |
| Iconic | Work that stands out instantly and lasts over time |
| Emotional Resonance | Design for joy, not just utility |

## Usage Modes

### Reference Mode

When asked about specific principles or cards, load and present the relevant content from `references/design-cards.md`. Examples:
- "What are the CLEAR principles?" → Present the 4 CLEAR cards
- "Tell me about Progressive Disclosure" → Present that specific card
- "What questions should I ask about minimalism?" → Present Minimalism card questions

### Interactive Review Mode

When asked to review a design or walk through principles, conduct a structured review session:

1. **Identify the design scope** - What feature, page, or component is being reviewed?
2. **Select relevant values** - Not all 16 cards apply to every review. Choose based on context:
   - New feature: Focus on CLEAR and EFFICIENT
   - Error handling: Focus on DURABLE
   - Visual polish: Focus on PRECISE and DELIGHTFUL
   - Full review: Walk through all 5 values
3. **Ask evaluation questions** - Present questions from each relevant card
4. **Document findings** - Note which questions reveal gaps or opportunities
5. **Prioritize improvements** - Rank findings by impact and effort

## Interactive Review Workflow

To conduct an interactive design review:

### Step 1: Scope
Ask what's being reviewed (screenshot, Figma link, feature description, or code).

### Step 2: Context
Determine review focus:
- Is this early-stage (focus on CLEAR, EFFICIENT)?
- Is this near-final polish (focus on PRECISE, DELIGHTFUL)?
- Is this error handling or edge cases (focus on DURABLE)?

### Step 3: Walk Through Cards
For each relevant card:
1. State the card name and tagline
2. Present 2-3 key questions from the card
3. Wait for user response or assessment
4. Note any gaps or opportunities identified

### Step 4: Summarize
After completing the review:
1. List identified gaps grouped by value
2. Suggest specific improvements
3. Prioritize by impact

## Quick Reference

| Value | Key Question |
|-------|--------------|
| CLEAR | Can users find and understand this without effort? |
| PRECISE | Does the interface accurately represent what will happen? |
| EFFICIENT | Are we asking only what we must and minimizing steps? |
| DURABLE | Can users recover from mistakes and experiment safely? |
| DELIGHTFUL | Would this inspire someone or make them want to share it? |

## Additional Resources

For the complete set of 16 cards with all evaluation questions and guidance, see:
- **`references/design-cards.md`** - Full card content organized by value

## Source

These principles are from [railway.design/cards](https://railway.design/cards).
