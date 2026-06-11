# Liquid Democracy Simulator

An **interactive educational simulator** for exploring how liquid democracy works — direct voting, flexible delegation, topic-specific experts, and collective results visible in real time.

> This simulator does **not** represent real electoral processes or official voting systems.
> Its purpose is pedagogical and conceptual.

## What is Liquid Democracy?

Liquid democracy combines elements of direct and representative democracy:

- Each person can **vote directly** on a proposal
- Or **delegate their vote** to a trusted person
- Delegation can be done **per topic** (e.g. environment, education)
- Votes can be revoked at any time

This model seeks greater **flexibility, informed participation, and adaptability**.

## Features

- Proposals (initiatives / public policies) organized by topic
- Characters with different profiles: topic experts, informed citizens, activists, apathetic citizens
- Per-topic vote delegation
- Automatic final voter resolution through delegation chains
- Real-time visualization of direct and delegated votes
- Internationalization: Spanish and English
- Dark theme with glassmorphism design

## Tech Stack

- HTML
- JavaScript (vanilla)
- Tailwind CSS (CDN)

## Getting Started

Open `index.html` in your browser:

```bash
open index.html
```

No server required — the simulator is 100% client-side.

## Project Structure

```
liquid-democracy-simulator/
├── index.html          # Main page (hero + simulator)
├── core.js             # Voting & delegation logic
├── main.js             # Simulator UI
├── i18n.js             # Translation system (ES/EN)
├── img/                # Avatar images
├── README.md
├── LICENSE
└── .gitignore
```

## Bug Fixes Applied

The following logical errors were identified and fixed in the original codebase:

1. **Infinite recursion on circular delegations** — `visited.add()` was missing in the delegation chain resolver
2. **`reset()` deleting the delegation object** — Changed to reinitialize as empty object
3. **Artificial limitation on delegates** — Removed restriction preventing multiple people from delegating to the same person
4. **Inconsistent delegation lookup order** — Standardized to check topic first, then proposal-specific
5. **Silent ignoring of unvoted people** — Added `pending` count to proposal results
6. **Initial topic not synced** — Core's `currentTopic` was empty on startup, causing no initiatives to display

## License

MIT License. See [LICENSE](LICENSE) for details.
