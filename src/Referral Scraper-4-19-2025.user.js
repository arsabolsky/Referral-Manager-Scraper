// ==UserScript==
// @name         Referral Scraper
// @version      4-19-2025
// @description  Send Referral Data
// @author       FTM Office
// @match        https://referralmanager.churchofjesuschrist.org/dashboard/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=churchofjesuschrist.org
// @grant        GM.xmlHttpRequest
// @connect      googleusercontent.com
// @connect      google.com
// ==/UserScript==

/**
 * The link to the CSV file containing the deployment ID.
 */
const CSVLINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzmRnqGGFv_EVvvIjE_u5MMk9FrWp-2dlxq-RWm9wHlTFJEqc8PLdS481aACfhREzOkPgIvoG9k2s7/pub?gid=1564370644&single=true&output=csv";

/**
 * Fetches the deployment ID from the CSV file.
 * @returns {Promise<string>} A promise that resolves to the deployment ID.
 */
function getDeployment() {
    return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
            method: "GET",
            url: CSVLINK,
            onload: function(response) {
                const deploymentId = response.responseText.trim();
                console.log(deploymentId);
                resolve(deploymentId);
            },
            onerror: function(error) {
                console.error("Failed to fetch CSV:", error);
                reject(error);
            }
        });
    });
}

/**
 * Parses a block of text into pairs of area and value.
 * @param {string} block - The block of text to parse.
 * @returns {Array} An array of objects containing area and value pairs.
 */
function parseBlocks(block) {
    let bs = block.split(/\((?=[\d])/g)
    .map(m=>
      m.split(/\)\s/g)
        .map(b=>b.trim().replace(/\s\s/g," "))
    ).flat().filter(Boolean);
    return toPairs(bs);
}

/**
 * Converts an array into pairs of area and value.
 * @param {Array} array - The array to convert.
 * @returns {Array} An array of objects containing area and value pairs.
 */
function toPairs(array) {
    let pairsArray = [];
    for (let i = 0; i < array.length; i += 2) {
      pairsArray.push({area:array[i+1], value: array[i]});
    }
    console.log(pairsArray);
    return pairsArray;
}

/**
 * Sends a POST request with JSON data.
 * @param {Object} obj - The data object to send.
 * @param {string} location - The location to send the data to.
 * @param {string} operation - The operation to perform (e.g., "replace", "append").
 * @param {string} deploymentId - The deployment ID.
 */
function sendingData(obj, location, operation, deploymentId) {
    console.log("SENDING DATA");
    console.log(JSON.stringify(obj));
    GM.xmlHttpRequest({
        method: "POST",
        url: `https://script.google.com/macros/s/${deploymentId}/exec?operation=${operation}&location=${location}`,
        data: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        },
        responseType: "json",
        onload: (response) => console.log(response),
        onerror: (error) => console.error("Failed to send data:", error) // Error handling
    });
}

/**
 * Collects data from the DOM, transforms it, and sends it via sendingData.
 * @param {string} deploymentId - The deployment ID.
 */
function grabData(deploymentId) {
    const timestamp = Date.now();
    const numQueuedReferrals = document.querySelector(".col-two.number.dsk")?.textContent.trim() || 'N/A';
    const numUnattemptedReferrals = document.querySelector(".green-25")?.textContent.trim() || 'N/A';
    const numUncontactedReferrals = document.querySelector(".amber")?.textContent.trim() || 'N/A';
    const unattemptedBlock = parseBlocks(document.querySelectorAll("div.scrollable-list.area-list")[1]?.textContent.trim() || 'N/A');
    const uncontactedBlock = parseBlocks(document.querySelectorAll("div.scrollable-list.area-list")[0]?.textContent.trim() || 'N/A');

    const unattemptedData = unattemptedBlock.map(block => ({ ...block, timestamp}));
    const uncontactedData = uncontactedBlock.map(block => ({ ...block, timestamp}));

    sendingData(unattemptedData, 'ReferralUnattempted', "replace", deploymentId);
    sendingData(uncontactedData, 'ReferralUncontacted', "replace", deploymentId);

    const summaryData = [{
        "Unassigned Referrals": parseInt(numQueuedReferrals, 10) || 0,
        "Not Attempted Referrals": parseInt(numUnattemptedReferrals, 10) || 0,
        "Uncontacted Referrals": parseInt(numUncontactedReferrals, 10) || 0,
        timestamp
    }];
    sendingData(summaryData, 'ReferralSummary', "append", deploymentId);
}

/**
 * Sets up periodic data grabbing and page reloading.
 */
async function main() {
    const deploymentId = await getDeployment();
    setTimeout(() => grabData(deploymentId), 60 * 1000); // Grabs data after 10 seconds

    const timeoutTime = 3 * 60 * 1000 * (Math.random() / 2 + 1);
    console.log(`Waiting: ${timeoutTime / 60000} Minutes`);

    setTimeout(() => location.reload(), timeoutTime);
}

/**
 * Periodically simulates a click to keep the user logged in.
 */
function stayLoggedInByClick() {
    document.body.click();
    console.log("Click!");

    setTimeout(stayLoggedInByClick, 60 * 1000 * (Math.random() / 2 + 1));
}

/**
 * Adds a GUI element to the page with an iframe and a close button.
 */
// function addGUI() {
//     const parent = document.createElement("div");
//     document.body.appendChild(parent);
//     parent.innerHTML = "<div><h1>Do Not Close.</h1><h2>Leave this window open and do not lock the computer.</h2>Thanks! -The Office Elders</div>";
//     Object.assign(parent.style, {
//         width: "100%",
//         height: "100%",
//         position: "absolute",
//         left: "0",
//         bottom: "0",
//         backgroundColor: "white",
//         zIndex: "1000",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center"
//     });
// }

/**
 * Reloads the page to keep the session active.
 */
function reloadPage() {
    window.location.href = "https://referralmanager.churchofjesuschrist.org/dashboard/(right-sidebar:tasks)";
    location.reload();
}

// Initialize the script
main();
stayLoggedInByClick();
// addGUI();