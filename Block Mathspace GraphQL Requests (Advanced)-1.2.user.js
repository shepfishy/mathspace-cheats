// ==UserScript==
// @name         Block Mathspace GraphQL Requests (Advanced)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Block all requests to https://mathspace.co/graphql/public/
// @match        *://mathspace.co/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (url && url.includes("/graphql/public/")) {
            console.log("Blocked fetch request to:", url);
            return Promise.reject("Request blocked by Tampermonkey script.");
        }
        return originalFetch.apply(this, args);
    };

    // Intercept XMLHttpRequest requests
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (url && url.includes("/graphql/public/")) {
            console.log("Blocked XMLHttpRequest to:", url);
            this.abort(); // Immediately abort the request
        } else {
            originalOpen.apply(this, arguments);
        }
    };

    // Monitor for any dynamically added scripts or iframes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === "SCRIPT" || node.tagName === "IFRAME") {
                        const src = node.src || "";
                        if (src.includes("/graphql/public/")) {
                            console.log("Blocked dynamic element loading from:", src);
                            node.remove(); // Remove the offending element
                        }
                    }
                });
            }
        });
    });

    // Start observing the entire document for added elements
    observer.observe(document.documentElement, { childList: true, subtree: true });

})();
