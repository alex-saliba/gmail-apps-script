# Gmail SLA Tracker Script

This Google Apps Script helps Gmail users, especially those working in marketing agencies or similar client-facing roles, to track email threads and ensure timely responses based on Service Level Agreements (SLAs) with clients. The script automatically checks for client emails that have not been replied to and sends an email summary to your own inbox, helping you prioritise responses.

This is a free script to add to your Google account (https://script.google.com/home).

# Key Features

- Automated Email Thread Tracking: The script scans your inbox for emails from clients where the last email sent was from the client, allowing you to focus on conversations that require your attention.

- SLA Timer: It calculates the number of hours left before the SLA deadline or how much time has passed since the SLA was breached for each email thread.

- Customisable Parameters: Easily set the number of days to look back, the SLA time limit (in hours), and a list of client email domains to monitor.

- Organised Summary Email: Receive a formatted email with the list of clients and relevant email threads, including Client name, Email subject and sender, Link to the email thread, time left before SLA expiration or the time passed since expiration, Color-coded SLA status (green for within SLA, red for breached SLA)

Thread Archiving: If you archive an email thread (or the email is no longer in your inbox), the script will ignore it in future checks, preventing unnecessary reminders.

# How It Works

1. The script searches your Gmail inbox for emails from specific client domains (@clientname.com) where the last message was sent by the client within a customisable number of days (By default, it is set to check for emails received in the last 3 days)

2. It calculates the hours left before the SLA expires or the hours that have passed since the last client message.

3. It sends an email to your inbox with a detailed report of emails that need attention, helping you stay on top of client communication.

# Setup Instructions

1. Copy the script file to your Google Apps Script editor by going to https://script.google.com/home and click on  'New project'

2. Customise the parameters at the top of the script, including The number of days to look back for client emails, an array of client email domains to monitor (e.g., ['@clientdomain.com']), the number of hours before an SLA is considered breached.

3. Set up a trigger to run the script at your desired interval (e.g., daily or hourly).

4. Enjoy automated email tracking and SLA notifications!

# Example of the Email Format:

Client Name: Client One

From: client@clientdomain.com

Subject: Weekly Report

Sent on: Wed, Sep 25, 4:22 PM

Link: View Thread (URL to the email)

SLA Status: SLA: 4 hours left (in green) or SLA: 2 hours passed (in red)

(The details of each email found will be formatted like this as a list inside the report email sent to your address)

# How to Schedule Google Apps Script to Run Daily

1. Open Your Google Apps Script Project: Open your script in the Google Apps Script editor by going to script.google.com or through your Google Workspace app (e.g., Sheets or Gmail).
   
2. Access the Triggers Page: In the Google Apps Script editor, click on the clock icon in the toolbar labeled Triggers (also referred to as Triggers from this project). This will open the triggers management page.
   
3. Create a New Trigger: Click on the + Add Trigger button at the bottom-right of the page.

4. Set the Trigger Configuration:

- Choose which function to run: Select the function you want to run automatically (e.g., checkClientEmailsAndSendReport).
- Choose which deployment should run: Leave this as "Head" (the default setting).
- Select event source: Choose Time-driven.
- Select type of time-based trigger: Choose Day timer.
- Select time of day: Choose the specific time of day you want the script to run (e.g., every day at 8:00 AM).

5. Save and Authorize: Click Save after setting up the trigger. If this is your first time creating a trigger, you’ll be asked to grant authorization for the script to access certain Google services like Gmail. Click Authorize and follow the prompts to approve permissions.

# Files
The single code.gs file handles the email tracking and SLA monitoring.

Feel free to customise the content to fit the specifics needs.
For any questions, you can contact me by email at alexanderpsaliba@gmail.com.

# Disclaimer
This Google Apps Script interacts with your Gmail inbox and requires access to read and send emails on your behalf. By using this script, you are granting the necessary permissions for it to perform these actions. Please ensure that you understand the security implications before running it on your account. The script processes client email domains and can expose email data, so it should be used with caution, especially if handling sensitive information.

