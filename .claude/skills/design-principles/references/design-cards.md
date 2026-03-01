# Railway Design Cards

Complete reference for all 16 design cards across Railway's 5 core values.

---

## 1. CLEAR

### 1.1 Place

**Follow user workflow, not system structure**

| Question | Guidance |
|----------|----------|
| Is this where users would naturally look for it? | Consider their mental model. Map where they'd logically look based on current context. |
| Can users discover this when they need it? | Even if it's not where they first look, are there clear visual cues or logical paths to find it? |
| Are we organizing by our convenience or theirs? | Question internal logic. Just because it's easier to maintain doesn't mean it's better for users. |
| Are frequently used items placed prominently? | Prime placement should go to high-frequency actions and information. |
| Are we prioritizing 'clean' over findable? | The finest work is wasted if users can't find it. |

### 1.2 Clarity

**Turn system complexity into user confidence**

| Question | Guidance |
|----------|----------|
| Are we using the fewest words while staying clear? | Prioritize brevity without sacrificing comprehension. |
| Does the system clearly indicate what's happening? | Loading states, processing indicators, current mode/state should be obvious without guessing. |
| Can users predict what will happen before they act? | Button labels, link destinations, and action outcomes should be clear before users commit to them. |
| Does the system give appropriate feedback for actions? | Feedback should match the significance of the action that triggered it. |
| Is the communication timing appropriate? | Information appears when users need it, not too early (overload) or too late (confusion). |

### 1.3 Purposeful Composition

**Arrange elements with clear intent and visual harmony**

| Question | Guidance |
|----------|----------|
| Does visual hierarchy show what's most important? | Users should be able to scan and immediately grasp priority and relationships. |
| Does the composition guide attention naturally? | Eye flow should feel smooth and purposeful, not chaotic or disperse. |
| Does every element feel intentionally placed? | Nothing should feel randomly positioned or like an afterthought. |
| Is spacing purposeful and consistent? | Spacing should create clear groupings and breathing room. |
| Does visual weight match the actual importance of elements? | Make important things look important through size, color, or contrast. |

### 1.4 Minimalism

**Remove everything non-essential to reveal clarity**

| Question | Guidance |
|----------|----------|
| Can we remove this without hurting the user experience? | If the answer is yes, it probably shouldn't be there. |
| Is this competing for attention with more important elements? | Secondary elements shouldn't distract from primary actions and information. |
| Are we keeping this because it's useful or might be? | If it's not solving a proven problem, consider removing it. |
| Are we showing only what users need for their current task? | Hide advanced options, secondary actions, and contextual irrelevant items. |
| Can this be simplified further without losing meaning? | Rethink the approach to create the same meaning with fewer elements or visual cues. |

---

## 2. PRECISE

### 2.1 Accurate Representation

**Interface should accurately represent capabilities, state, and behavior**

| Question | Guidance |
|----------|----------|
| Do visual cues and button labels accurately represent what will actually happen? | Visual appearance and labels should match actual functionality. |
| Are disabled or unavailable actions clearly indicated upfront? | Users shouldn't have to click to find out something is disabled. |
| Does the interface behave consistently with user expectations based on appearance? | Visual design should predict behavior = no surprises after clicking. |
| Are user permissions clearly reflected in the available interface options? | Different user roles should see appropriately filtered capabilities. |

### 2.2 Spatial Continuity

**Maintain visual connection between interface states to preserve user context**

| Question | Guidance |
|----------|----------|
| When users navigate across different tabs, do they return to the previous context? | Preserve scroll position, selections, and filters when switching between tabs. |
| Do interface changes maintain user orientation and show clear progression? | Users should never lose track of where they are or what they were originally doing. |
| Are we morphing elements rather than stacking layers? | Transform existing elements instead of adding new ones. |
| Do modal dialogs maintain visual relationship to their trigger? | Show connection between the action that opened the modal and the modal itself. |

### 2.3 Physical Authenticity

**Interface elements that reference the physical world should behave realistically**

| Question | Guidance |
|----------|----------|
| Are shadows sized and blurred according to realistic elevation? | Higher elements cast larger, softer shadows; closer elements have smaller, sharper shadows. |
| Do elements have smooth entrance and exit transitions? | Avoid jarring pops - elements should ease in and out naturally. |
| Are we animating only what's necessary and avoiding repetitive, tiring effects? | Don't animate the same elements every time users return. |
| Do interface changes feel smooth rather than abrupt? | State changes, reveals, and updates should have appropriate transition timing. |

---

## 3. EFFICIENT

### 3.1 Effort Reduction

**Infer what you can, ask only what you must**

| Question | Guidance |
|----------|----------|
| Are we asking for data we can detect or calculate? | Understand user intent and context from their actions rather than asking them to explicitly provide it. |
| Can we auto-complete this based on common patterns or user history? | Learn from user behavior and common inputs to suggest completions and reduce typing effort. |
| Can we guess the most likely choice and let users override if needed? | Default to the most probable option based on context, patterns, or user history rather than forcing selection. |
| Are we asking for confirmation when the action is easily reversible? | Skip confirmation dialogs for actions that can be undone and save confirmations for destructive or irreversible operations. |

### 3.2 Step Minimization

**More steps mean fewer completions**

| Question | Guidance |
|----------|----------|
| Can we combine related actions into a single interaction? | Group related functions so users can accomplish multiple things in one action rather than separate steps. |
| Can we enable direct manipulation instead of multi-step workflows? | Allow users to drag, click, or edit directly rather than going through menus and dialog boxes. |
| Can we eliminate steps by making reasonable assumptions about user goals? | Skip unnecessary choices by defaulting to what users typically want, letting them override if needed. |
| Can we reduce the number of decisions users must make to complete tasks? | Minimize choice points and decision fatigue by handling routine decisions automatically. |

### 3.3 Progressive Disclosure

**Show only what's needed, when it's needed**

| Question | Guidance |
|----------|----------|
| Are we showing only what's needed now? | Keep the interface focused by surfacing only the elements required for the current task or decision. |
| Is the first view clean and unintimidating? | The first step should feel approachable, with complexity hidden until needed. |
| Are we preventing decision paralysis by limiting options? | Keep option sets small to maintain decision momentum. |
| Are rarely used options tucked away without feeling buried? | Hide low-frequency features without making them impossible to find when users actually need them. |
| Can we collapse less important details? | Keep non-crucial details accessible but not visible by default. |

---

## 4. DURABLE

### 4.1 Error Recovery

**Turn error states into recovery opportunities**

| Question | Guidance |
|----------|----------|
| Can users understand why something failed and what to do about it? | Explain the cause clearly and provide specific actions to resolve the issue. |
| Can users preview potential errors before they occur? | Show warnings or validation that help users course-correct proactively. |
| Can users retry failed actions without re-entering all their information or restart from zero? | Keep user data intact during error recovery and retry attempts. |
| Do we help users build better habits through error feedback? | Use errors as learning opportunities to improve user patterns. |

### 4.2 Resilience

**Make experimentation safe and consequence-free**

| Question | Guidance |
|----------|----------|
| Do interface elements respond predictably to unexpected user interactions? | Edge case interactions shouldn't cause crashes, errors, or broken states. |
| Can users experiment with new features without fear of damaging their data? | Exploration should feel safe. Users shouldn't worry about losing work or settings. |
| Does the interface handle incomplete or partial user input gracefully? | Work with users who save drafts, leave forms half-filled, or work incrementally. |

### 4.3 Reversible Actions

**Make mistakes fixable rather than preventable**

| Question | Guidance |
|----------|----------|
| Do we offer 'soft delete' periods before permanent removal? | Give users time to change their mind after deletion actions. |
| Do we use undo instead of confirmation dialogs? | Give users time to change their mind after deletion actions. |
| Can users go back to how things were before? | Provide clear restoration paths to previous states and configurations. |

---

## 5. DELIGHTFUL

### 5.1 Ingenuity

**"I haven't seen this before, but it makes perfect sense."**

| Question | Guidance |
|----------|----------|
| Does it feel inventive without trying too hard? | Cleverness should feel effortless and natural, never forced or gimmicky. |
| Is the idea obvious in hindsight? | Smart solutions often feel like they were always meant to be there once you experience them in context. |
| Would this make someone say 'oh wow' and 'of course'? | Deliver surprise and clarity in the same moment, creating a sense of inevitable brilliance. |
| Would users immediately understand the benefit? | The value should be clear at a glance, no explanation needed to make sense of the change. |
| Would this approach inspire future improvements? | Great ingenuity often sparks new ways of thinking and sets a higher bar across the system. |

### 5.2 Iconic

**Work that stands out instantly and lasts over time.**

| Question | Guidance |
|----------|----------|
| Would this inspire someone? | Excellence perpetuates itself. You're creating what once pushed you to aim higher. |
| Is this a benchmark of your craft? | The result should feel worthy of being the standard you share with the world. |
| Would we look back and say this was the highest standard we could reach at the time? | It should reflect the very best we could deliver with the knowledge, tools, and insight available. |
| Is this pushing the limits of what we can build right now? | The work should explore the edge of what's possible without compromising reliability. |
| Would this make someone say, 'I wish I'd built that'? | The ultimate compliment of undeniable quality. |

### 5.3 Emotional Resonance

**Design for joy, not just utility**

| Question | Guidance |
|----------|----------|
| Does this moment spark a positive reaction? | If it feels invisible, that's fine. If it feels awkward, forced, or distracting, it needs rethinking. |
| Is the delight tied to the brand? | Playful details should feel uniquely ours, aligned with our tone and style, not random or generic. |
| Would someone want to share this? | When a moment feels effortless and delightful, users naturally talk about it or show it to others. |
| Does it elevate, not distract? | Delight should enhance the experience without slowing users down or creating noise. |
| Would this hold up after 100 uses? | Good design feels timeless, staying fresh and rewarding even after repeated interactions. |
