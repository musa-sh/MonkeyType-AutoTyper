@@ -0,0 +1,49 @@
@@ -0,0 +1,48 @@
# ⌨️ MonkeyType Autotyper with Cognitive Emulation

A highly optimized Tampermonkey/Violentmonkey userscript designed for **MonkeyType** that simulates realistic human typing behaviors. Instead of a linear, robotic text stream, this engine uses mathematical variance algorithms and simulated cognitive stutters to emulate a real typist working at elite speeds (190–250 WPM).

*Disclaimer: This project is created strictly for educational purposes, DOM manipulation analysis, and rhythmic simulation modeling.*

---

## ✨ Features

- **Dynamic WPM Scaling:** Continuously varies typing speed fluidly between 190 and 250 WPM instead of maintaining a rigid, detectable speed.
- **Human Variance Curve:** Implements a Gaussian-like distribution to mimic the natural micro-variations in standard human keystroke intervals.
- **Cognitive Hesitation Engine:** Introduces a configurable 15% chance to pause/stutter transiently when processing spacebars between words—simulating human thought transitions.
- **Native Event Dispatching:** Dispatches actual `InputEvent` and `KeyboardEvent` signals into the DOM rather than simply rewriting the input value, ensuring compatibility with the site's live tracking mechanics.

---

## ⌨️ Controls & Hotkeys

| Hotkey | Action |
| :--- | :--- |
| `/` (Forward Slash) | **Toggle Engine:** Instantly arms or pauses the autotyper execution loop. |

---

## 🚀 Installation & Setup

1. Make sure you have a userscript manager installed in your browser:
   - [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   - [Violentmonkey](https://violentmonkey.github.io/)
2. Create a new script inside your dashboard.
3. Paste the entire content of `monkeytype-autotyper.user.js` into the editor.
4. Save the script.
5. Head over to [MonkeyType](https://monkeytype.com) or the Dev branch, open a typing test, and tap `/` to watch the engine run.

---

## 🛠️ Configuration (Under the Hood)

You can easily adjust the parameters at the top of the script file to customize your typing profile:

```javascript
const MIN_WPM = 190;        // Minimum speed threshold
const MAX_WPM = 250;        // Maximum speed threshold

const HESITATION_CHANCE = 0.15; // 15% probability of a micro-pause between words
const MIN_PAUSE_MS = 80;    // Shortest possible thinking delay (ms)
const MAX_PAUSE_MS = 200;   // Longest possible thinking delay (ms)
