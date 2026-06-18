
// ==UserScript==
// @name MonkeyType Autotyper with Human Hesitation (educational purposes)
// @author Musa-sh (extended/fixed version of Kamron & Gemini)
// @description Advanced cognitive emulation engine. Varies speed dynamically between 190-250 WPM with random thinking stutters. Press "/" to toggle.
// @icon https://dev.monkeytype.com/images/favicon/favicon-32x32.png
// @version 3.0
// @match *://dev.monkeytype.com/*
// @match *://monkeytype.com/*
// @run-at document-idle
// @grant none
// @license MIT
// ==/UserScript==

(function() {
    "use strict";

    const TRIGGER_KEY = "Slash";
    const MIN_WPM = 190;
    const MAX_WPM = 250;

    // Cognitive Emulation Parameters
    const HESITATION_CHANCE = 0.15; // 15% chance to pause/stutter at word transitions
    const MIN_PAUSE_MS = 80; // Minimum "thinking" micro-pause
    const MAX_PAUSE_MS = 200;// Maximum "thinking" micro-pause

    let active = false;
    let sessionData = { beginTime: null };

    function getRandomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function calcInterval(isSpace) {
        const currentDynamicWPM = getRandomRange(MIN_WPM, MAX_WPM);
        let base = 60000 / (currentDynamicWPM * 5);

        // Standard human variance curve
        const n1 = Math.random();
        const n2 = Math.random();
        const curve = Math.sqrt(-2 * Math.log(n1)) * Math.cos(2 * Math.PI * n2);
        const humanFactor = Math.max(0.85, Math.min(1.15, 1 + curve * 0.07));
        let finalDelay = base * humanFactor;

        // 
        if (isSpace && Math.random() < HESITATION_CHANCE) {
            const stutterDelay = getRandomRange(MIN_PAUSE_MS, MAX_PAUSE_MS);
            finalDelay += stutterDelay;
        }

        return finalDelay;
    }

    function isReady() {
        const testArea = document.getElementById("typingTest");
        if (!testArea) return false;
        return active && !testArea.classList.contains("hidden");
    }

    function getInputTarget() {
        return document.getElementById("wordsInput") ||
               document.querySelector(".typingTest input") ||
               document.querySelector("input[type='text']:not([placeholder])");
    }

    function fetchNextChar() {
        const currentWord = document.querySelector(".word.active");
        if (!currentWord) return null;
        for (const letter of currentWord.children) {
            if (letter.className === "" || letter.className.includes("current")) {
                return letter.textContent;
            }
        }
        return " ";
    }

    function typeCharNative(inputField, char) {
        if (!inputField) return false;

        inputField.focus();
        inputField.value += char;

        const inputEvent = new InputEvent("input", {
            inputType: "insertText",
            data: char,
            bubbles: true,
            cancelable: true
        });
        inputField.dispatchEvent(inputEvent);

        const keyEvent = new KeyboardEvent("keydown", {
            key: char,
            code: char === " " ? "Space" : `Key${char.toUpperCase()}`,
            bubbles: true
        });
        inputField.dispatchEvent(keyEvent);

        return true;
    }

    function processChar() {
        if (!isReady()) return;

        const inputElement = getInputTarget();
        if (!inputElement) {
            setTimeout(processChar, 100);
            return;
        }

        const nextChar = fetchNextChar();
        if (nextChar === null) {
            setTimeout(processChar, 25);
            return;
        }

        if (!sessionData.beginTime) {
            sessionData.beginTime = Date.now();
        }

        typeCharNative(inputElement, nextChar);

        // Pass whether this character is a space to determine if a stutter can occur
        setTimeout(processChar, calcInterval(nextChar === " "));
    }

    window.addEventListener("keydown", function(e) {
        if (e.code === TRIGGER_KEY) {
            const currentFocus = document.activeElement;
            if (currentFocus.tagName === "INPUT" && currentFocus !== getInputTarget()) return;

            e.preventDefault();
            if (e.repeat) return;

            active = !active;

            if (active) {
                sessionData = { beginTime: null };
                console.log("[Engine] Active | Dynamic + Cognitive Hesitation Profile");
                const inputElement = getInputTarget();
                if (inputElement) inputElement.focus();
                setTimeout(processChar, 25);
            } else {
                console.log("[Engine] Paused");
            }
        }
    });

    console.log("[Engine] Cognitive script loaded. Tap '/' to toggle.");
})();



