function myGmailChecker() {
  
// ----------- Customise Your Variables BELOW -------------
  var numOfDaysToLookBack = 3; // number of days to look back for threads
  var clientDomains = ['@clientOne.com', '@clientTwo.com']; // list of client email domains to be searched for in your inbox
  var serviceLevelAgreementHours = 24; // SLA in hours
  var myEmail = 'youremail@example.com'; // ATTENTION: make sure to add YOUR OWN email address here to which the email report will be sent.
  var emailSubject = 'My SLA Report: Emails Needing Attention'; // customisable email subject

  // How to change the banner image (500x100) 
  // 1. Uploaded an image to your Google Drive account
  // 2. Preview the uploaded and go to share > Anyone with link (viewer) > Copy link
  // 3. Copying the link will return a URL like this: https://drive.google.com/file/d/1bxzUxcp-dNjeUlR1REuPi0WeCugBcl76/view?usp=sharing
  // 4. Copy the file ID (in th example above, the file ID is: "1bxzUxcp-dNjeUlR1REuPi0WeCugBcl76")
  // 5. Paste the file id in the variable below
  var imageFileId = "1bxzUxcp-dNjeUlR1REuPi0WeCugBcl76"; 
  // -----------------------------------------------

  // start of the script
  // calculate the cut-off date
  var cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - numOfDaysToLookBack);
  
  // get all threads in the inbox from the last X days
  var threads = GmailApp.search('in:inbox after:' + Utilities.formatDate(cutoffDate, Session.getScriptTimeZone(), 'yyyy/MM/dd'));
  
  var emailBody = '';
  var foundEmails = false;

  // loop through each thread retrieved from Gmail
  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    var lastMessage = messages[messages.length - 1];
    var lastSender = lastMessage.getFrom();
    var threadLink = 'https://mail.google.com/mail/u/0/#inbox/' + thread.getId();
    var subject = thread.getFirstMessageSubject();
    var threadDate = lastMessage.getDate();

    if (thread.isInInbox()) {
      for (var j = 0; j < clientDomains.length; j++) {
          if (lastSender.indexOf(clientDomains[j]) !== -1) { // if the thread's last sender matches the email address of the client
            foundEmails = true;

            // calculate thehours left (time difference)
            var now = new Date(); // make Date Object of current timestamp
            var hoursSinceLastEmail = (now - threadDate) / (1000 * 60 * 60); // Difference in hours
            var hoursLeft = serviceLevelAgreementHours - hoursSinceLastEmail; // Calculate hours left

            if (hoursLeft > 0) {
                hoursMessage = Math.floor(hoursLeft) + ' hours left before SLA expires.';
            } else {
                hoursMessage = Math.abs(Math.floor(hoursLeft)) + ' hours passed since SLA expired.';
            }

            // email formatting
            emailBody += '<b><u>' + clientDomains[j].replace('@', '') + '</u></b><br>';
            emailBody += 'From: ' + lastSender + '<br>';
            emailBody += 'Subject: ' + subject + '<br>';
            emailBody += 'Sent on: ' + Utilities.formatDate(threadDate, Session.getScriptTimeZone(), 'EEE, MMM d, h:mm a') + '<br>';
            emailBody += 'Link: <a href="' + threadLink + '" target="_blank">' + threadLink + '</a><br>';
            if (hoursLeft > 0) {  // Assuming hoursLeft is the variable tracking SLA hours remaining
              emailBody += '<span style="color: green; font-weight: bold;">SLA: ' + hoursMessage + '</span><br><br>';
            } else { // SLA has expired
              emailBody += '<span style="color: red; font-weight: bold;">SLA: ' + hoursMessage + '</span><br><br>';
            }
          }
      }
    }
  }
    // email settings formatting (bottom of the email)
    emailBody += '<b>Settings:</b><br>';
    
    emailBody += 'Your current SLA is set to: ' + serviceLevelAgreementHours + ' hours.' + '<br>';
    emailBody += 'Searching for emails received up to: ' + numOfDaysToLookBack + ' days ago.' + '<br>';
    emailBody += 'Clients: ';
    for (k = 0; k < clientDomains.length; k++)
    {
      if (k + 1 < clientDomains.length)
      {
          emailBody += clientDomains[k] + ', ';
      } else {
          emailBody += clientDomains[k] + '';
      }
    }
    emailBody += '<br>';
    emailBody += 'Your email address: ' + myEmail + '<br>' + '<br>';
    
    var imageUrl = 'https://drive.google.com/uc?export=view&id=' + imageFileId;
    emailBody += '<a href="https://www.linkedin.com/in/alex-saliba-054312141/" target="_blank"><img src="' + imageUrl + '" alt="Image" width="500" height="100"></a>';

    // if there are emails to report, send the email + log successful console message
    if (foundEmails) {
      GmailApp.sendEmail(myEmail, emailSubject, '', {
        htmlBody: emailBody
      });
      Logger.log("Script ran successfully. Sending email.\n.");
    }
    else
    {
      Logger.log("No emails awaiting reply.\n");
    }
}
