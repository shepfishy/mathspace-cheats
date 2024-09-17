// ==UserScript==
// @name         Remove Mathspace Assignment
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Deletes the entire div structure on Mathspace student page with MutationObserver
// @author       You
// @match        https://mathspace.co/student/*
// @match        https://mathspace.co/student/
// @match        https://mathspace.co/*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove the target div if found
    function removeTargetDiv() {
        const targetDiv = document.querySelector('.css-oz1e77-Wrapper.evxkqpl0');
        if (targetDiv) {
            targetDiv.remove();
            console.log('Target div removed.');
        }
    }

    // Create a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            removeTargetDiv(); // Try to remove the div each time the DOM changes
        });
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    // Try to remove the target div initially in case it's already present
    removeTargetDiv();
})();
