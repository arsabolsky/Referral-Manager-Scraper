// ==UserScript==
// @name         Internal Server Error Redirect
// @namespace    http://tampermonkey.net/
// @version      2025-03-26
// @description  try to take over the world!
// @author       You
// @match        https://referralmanager.churchofjesuschrist.org/login*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.location = 'https://referralmanager.churchofjesuschrist.org/';
    // Your code here...
})();