// ==UserScript==
// @name         Remove Mathspace Assignment Box
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Delay rendering of elements and update the text and remove unwanted elements
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove unwanted elements and update heading text
    function cleanUpContainer() {
        const container = document.querySelector('div.evxkqpl1.css-mkm0a1-Container');
        if (container) {
            const heading = container.querySelector('div.css-14eu42k-Headings.elbjrzx94');
            const spacer = container.querySelector('div.css-121nrdk');

            // Ensure heading exists and the text isn't already updated
            if (heading && heading.textContent !== "Your updated tasks") {
                heading.textContent = "Your updated tasks"; // Set your new text here
            }

            // Remove all child elements except for the heading and spacer
            Array.from(container.children).forEach(child => {
                if (child !== heading && child !== spacer) {
                    child.remove();
                }
            });
        }
    }

    // Delay the page rendering by using MutationObserver
    const observer = new MutationObserver((mutationsList, observer) => {
        // Look for the container element to ensure it's loaded before executing the changes
        const container = document.querySelector('div.evxkqpl1.css-mkm0a1-Container');
        if (container) {
            // Perform cleanup and text update
            cleanUpContainer();
            observer.disconnect(); // Disconnect observer after changes are made
        }
    });

    // Start observing the body or document for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Set a delay before the script starts observing and making changes
    setTimeout(() => {
        const container = document.querySelector('div.evxkqpl1.css-mkm0a1-Container');
        if (container) {
            // Ensure cleanup happens after a delay
            cleanUpContainer();
        }
    }, 2000); // Delay time (2000ms = 2 seconds) - adjust as needed
})();
