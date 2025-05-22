**Installation Steps:**

1. **Create New Chrome Profile:** [Manage Chrome with multiple profiles](https://support.google.com/chrome/answer/2364824)  
   * Name the profile `Referral Manager Scraper`  
   * **Open Referral Manager on Browser Startup:** [https://support.google.com/chrome/answer/95314?co=GENIE.Platform%3DDesktop\&oco=1\#zippy=%2Copen-a-specific-set-of-pages](https://support.google.com/chrome/answer/95314?co=GENIE.Platform%3DDesktop&oco=1#zippy=%2Copen-a-specific-set-of-pages)  
1. On your computer, open Chrome.  
2. At the top right, select More ![More](/images/image6.png) ![and then](/images/image8.png) Settings.  
3. Under "On startup," select `Open a specific page or set of pages`.  
4. Select 	`Add a new page`.![](/images/image7.png)  
5. Enter `https://referralmanager.churchofjesuschrist.org/dashboard`  
6. Select `Add`  
2. **Setup Launch `Referral Manager Scraper` Chrome Profile on Laptop Bootup:**  
   * **Create `Referral Manager Scraper` Chrome Profile Shortcut:**   
     1. Open the profile you want to create a shortcut for, by clicking your photo or initials at the top right, then select the profile to launch it.  
     2. Click the 3 dot menu at the top right of Chrome.  
     3. Click Settings.  
     4. Click Customize your Chrome profile.  
     5. Scroll down and click the Create desktop shortcut toggle.  
   * **Copy Shortcuts to Startup Folder:**  
     1. Press \`Win \+ R\` to open the Run dialog.  
     2. Type `shell:startup` and press Enter to open the Startup folder.  
     3. Copy the shortcut (located on the desktop) you created into this folder.  
        ![](/images/image12.png)
   * **Test the Setup:**  
     1. Restart your computer or log out and log back in to Windows.  
     2. Google Chrome should automatically open with the specified Google account signed in.  
3. **Install Tamper Monkey:** [https://www.tampermonkey.net/faq.php?locale=en\#Q100](https://www.tampermonkey.net/faq.php?locale=en#Q100)   
   * **Enable Developer Mode:** [https://www.tampermonkey.net/faq.php\#Q209](https://www.tampermonkey.net/faq.php#Q209)   
     ![](/images/image10.png)
     ![](/images/image2.png)
4. **Access the Script Files:** Open the Google Drive folder "[\[Tamper Monkey\] Referral Manager Scraper](https://drive.google.com/drive/folders/1nRZLlb-zzdOS19d53WJpdkHUnmKfpRIh?usp=drive_link)” then the “[Tamper Monkey](https://drive.google.com/drive/folders/1YG5TXHu1qMBLJvzVAxwlaCCVVujvkA2L)” folder. You should see three files:  
   * `Auto Login-2025-02-05.user.js`  
   * `Referral Scraper-3-30-2025.user.js`  
   * `Internal Server Error Redirect-2025-03-26.user.js`  
5. **Download Each Script:** For each of the `.user.js` files, follow these steps:  
   * **Right-click:** Right-click on the file and select "Download."  
   * **Save the file:** Choose a location on your computer to save the downloaded file.  
6. **Import Each Script:** For each of the downloaded `.user.js` files, follow these steps:  
   * **Open Tampermonkey:** Open the Tampermonkey extension in your browser, Navigate to Dashboard, then Utilities  
     ![](/images/image11.png)
     ![](/images/image1.png)
   * **Import from file:** Click on the "Choose file" button or the equivalent in your Tampermonkey interface.  
     ![](/images/image3.png)  
   * **Install the Script:** Click on the "Install" button or the equivalent in your Tampermonkey interface.![](/images/image9.png)
   * **Repeat:** Repeat these steps for each of the three downloaded `.user.js` files.  
7. **Configuration (Auto Login Script):**  
   * **Edit the Script:** In Tampermonkey, go to the Dashboard. You should see the three installed scripts. Find "Auto Login-2025-02-05.user.js" and click on it to open it for editing.  
     ![](/images/image11.png)  
   * **Update Credentials:** Locate these lines:

```javascript
const USERNAME = "arsabolsky";
const PASSWORD = "ThisIsAPassw0rd!";
```

   * **Replace:** Change `"arsabolsky"` to your actual Referral Manager username (likely your Church Account username) and `"ThisIsAPassw0rd!"` to your actual password (HARD CODING CREDENTIALS IS A STUPID THING TO DO).  
   * **Save:** Save the changes to the script in Tampermonkey (usually File \> Save or a Save button).  
8. **Configuration (Referral Scraper Script):**  
   * **Deployment ID:** The `Referral Scraper-3-30-2025.user.js` script uses a Google Sheets CSV link to get a `deployment ID`. This ID is crucial for sending data to your Google Apps Script.  
   * **Verify CSV Link:** Check this line in the script:

```javascript
const CSVLINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSzmRnqGGFv_EVvvIjE_u5MMk9FrWp-2dlxq-RWm9wHlTFJEqc8PLdS481aACfhREzOkPgIvoG9k2s7/pub?gid=1564370644&single=true&output=csv";
```

   * **Ensure Access:** Make sure that this Google Sheet is accessible and that it contains the correct deployment ID (latest deployment ID for data barn) in the first cell. You can access the deployment ID here: [⚙️ CONTROL PANEL ⚙️](https://docs.google.com/spreadsheets/d/1yaRNixtT_iCwb0BXbPOFpM5G3tqtMmUpFi4WFHioCys/edit?gid=1564370644#gid=1564370644) on the sheet named `DEPLOYMENT` and you can get the latest deployment ID under `Manage deployments` here: [Data Barn](https://script.google.com/u/0/home/projects/1zJBUbBS61DDmq26EWwmGJZ4WVstogQzAXBsaRfuANQclPMhl9tl6tJGT/edit)  
9. **Close Chrome:** Ensure all Chrome windows are closed.  
10. **Reopen Chrome:** Make sure you are using the Referral Manager Scraper profile.  
11. **Verify Startup Page:** When Chrome opens, it should automatically navigate to the Referral Manager Dashboard URL: [`https://referralmanager.churchofjesuschrist.org/dashboard`](https://referralmanager.churchofjesuschrist.org/dashboard). Confirm that this page is displayed if not verify Step 1 has been completed correctly.   
    After Chrome loads the [`https://referralmanager.churchofjesuschrist.org/dashboard`](https://referralmanager.churchofjesuschrist.org/dashboard) webpage the Auto Login script (`Auto Login-2025-02-05.user.js`) will begin to log you in. script will begin to log you in.   
12. **Verify It’s Running:** Click `F12` on your keyboard and look for the `click`.   
    ![](/images/image4.png)
13. Data should start following into the data barn. You can check the databarn logs here: [⚙️ CONTROL PANEL ⚙️](https://docs.google.com/spreadsheets/u/0/d/1yaRNixtT_iCwb0BXbPOFpM5G3tqtMmUpFi4WFHioCys/edit) and Ctrl-F for `1Vti-MfVwteEo0LlXWqAgWSrUiwPYUGf3SuxHxsCOU6s`.**![](/images/image5.png)**  
14. Wow it worked I guess…idk? I'm getting bored of documenting this.   
    * Feast your eyes on what your genius hath wrought: **[\[LIVE\] ReferralSummary](https://docs.google.com/spreadsheets/d/1Vti-MfVwteEo0LlXWqAgWSrUiwPYUGf3SuxHxsCOU6s/edit?gid=0#gid=0)**