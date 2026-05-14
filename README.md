# FocusVector

Behavior-based attention drift estimation for digital reading sessions.

---

## Overview

FocusVector is a browser-based behavioral telemetry system that estimates possible attention drift during digital reading sessions using observable interaction patterns such as:

- scrolling behavior
- rereading patterns
- pauses and idle periods
- tab switching
- reading progression
- behavioral continuity signals

The project is designed as a privacy-conscious Chrome extension focused on measuring behavioral patterns, not thoughts or mental states.

FocusVector does **not** attempt to:
- read minds,
- diagnose psychology,
- analyze personal beliefs,
- or perform invasive monitoring.

Instead, it estimates potential continuity loss during reading using lightweight local heuristics and browser telemetry.

---

## Philosophy

Most productivity tools measure:
- time spent,
- tasks completed,
- streaks,
- or screen usage.

FocusVector explores a different question:

> Can behavioral interaction patterns reveal when someone may have lost continuity with the text they are reading?

The project is inspired by research in:
- Human-Computer Interaction (HCI)
- Cognitive Science
- Digital Reading Behavior
- Attention Research
- Browser Telemetry Systems

The system focuses on measurable signals rather than speculative psychological claims.

---

## Current Goals

The MVP focuses on:

- collecting lightweight reading telemetry,
- building rolling behavioral baselines,
- estimating possible attention drift conservatively,
- minimizing false positives,
- preserving user privacy,
- and providing subtle, non-intrusive interventions.

---

## Core Telemetry Signals

FocusVector currently explores:

- Scroll velocity
- Scroll variance
- Backward scrolling
- Region revisitation
- Pause duration
- Idle periods
- Reading progression rate
- Tab visibility changes
- Context switching behavior

Future experimental signals may include:
- Cursor movement dynamics
- Session fatigue estimation
- Optional webcam-based gaze estimation (strictly opt-in)

---

## Architectural Direction

FocusVector follows a layered behavioral-analysis pipeline:

```text
Raw Browser Events
→ Window Aggregation
→ Feature Extraction
→ Behavioral State Estimation
→ Intervention Decision
```

The project intentionally separates:
- telemetry collection,
- heuristic analysis,
- UI intervention,
- storage,
- and future AI augmentation.

---

## Extension Structure

```text
focusvector/
│
├── manifest.json
│
├── popup/
│   ├── popup.html
│   └── popup.js
│
├── scripts/
│   ├── content.js
│   ├── background.js
│   ├── analyzer.js
│   └── overlay.js
│
└── styles/
    └── overlay.css
```

---

## Privacy

FocusVector is designed with privacy-first principles.

The extension:
- does not record sensitive page content,
- does not upload browsing history,
- does not capture raw keystrokes,
- does not store raw webcam footage,
- and minimizes telemetry retention.

Behavioral analysis is intended to remain primarily local and inspectable.

---

## Intervention Philosophy

FocusVector avoids aggressive productivity-style interruptions.

Interventions are intended to:
- be subtle,
- be dismissible,
- avoid shaming users,
- and help users recover reading continuity.

The system aims to act more like:

> a calm reading assistant

rather than:

> an attention police system.

---

## Current Development Status

Current stage:

```text
v0.1.0 — Telemetry Foundation
```

Current priorities:
- Chrome Extension Manifest V3 setup
- Scroll telemetry collection
- Sliding telemetry windows
- Behavioral feature extraction
- Rolling user baselines
- Local heuristic experimentation
- Debugging and visualization tools

---

## Future Direction

Future versions may explore:
- adaptive behavioral baselines,
- contextual recap generation,
- reading-state estimation,
- fatigue modeling,
- optional local ML models,
- and AI-assisted context recovery.

Large language models are currently planned as:
- summarization tools,
- recap generators,
- and contextual assistants,

rather than primary drift detectors.

---

## Installation (Development)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/FocusVector.git
```

### 2. Open Chrome Extensions

```text
chrome://extensions
```

### 3. Enable Developer Mode

Toggle Developer Mode in the top-right corner.

### 4. Load the extension

Click:

```text
Load unpacked
```

Then select the project folder.

---

## License

Licensed under the Apache License 2.0.

See the LICENSE file for details.

---

## Disclaimer

FocusVector is an experimental behavioral telemetry project.

Attention, comprehension, and mind wandering are complex human phenomena that cannot be perfectly inferred from browser interaction alone.

The system should be treated as:
- probabilistic,
- approximate,
- and user-assistive,

not diagnostic or authoritative.
