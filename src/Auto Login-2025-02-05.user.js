// ==UserScript==
// @name         Auto Login
// @version      2025-02-05
// @author       FTM Office
// @match        https://id.churchofjesuschrist.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const USERNAME = "arsabolsky";
    const PASSWORD = "ThisIsAPassw0rd!";
    var pass;

    setTimeout( function() {
        console.log("running...");
        var waiter;
        setTimeout(function() {
            if (document.body.textContent.includes("You have been logged out due to inactivity. Refresh or return to the sign in screen.")) {
                window.location.href = "https://referralmanager.churchofjesuschrist.org/dashboard/(right-sidebar:tasks)";
                location.reload();
                return;
            }
        },5000);

        if(document.querySelector("label").textContent.includes("Username")) {
            waiter = waitForElm("#input28");
            pass = USERNAME;
            waiter.then(signin);
        }

        setTimeout(function() {
            waiter = waitForElm("#input53");
            pass = PASSWORD;
            waiter.then(signin);
        },5000);

    },5000);

        function signin(filler) {
            filler.click();
            filler.focus();
            console.log("filling form...");
            filler.value = pass;
            filler.innerHtml = pass;

            filler.dispatchEvent(new Event('input', { bubbles: true }));
            filler.dispatchEvent(new Event('change', { bubbles: true }));

            document.querySelector("input.button.button-primary").click();
        }
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
})();