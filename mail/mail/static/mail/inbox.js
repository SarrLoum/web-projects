document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Send email to the compose view when the form submit
  document.querySelector('#compose-form').addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');

});


function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  
  //Show all emails of the mailbox 
  load_emails(mailbox);

}


function send_email(event) {
  // Prevent default browser response to events
  event.preventDefault();

  // Send the form to the view to store inputs in database
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: document.querySelector('#compose-recipients').value,
      subject: document.querySelector('#compose-subject').value,
      body: document.querySelector('#compose-body').value
    })
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
  });

  // Load the sent mailbox
  load_mailbox('sent');
}


function load_emails(mailbox) {
  // Get a list of all the emails of the mailbox via a get request to api
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then (emails => {

    // Create an empty email section
    let emailSection = '';
    let color = '';

    emails.forEach((email) => {

      // Change background color if the is read
      if (email.read == true) {
        color = '#F2F5FC';
      } else {
        color = '#fff';
      }

      // Format timestamp
      let dateTime = timesTamp(email.timestamp);


      let senderName = getUserName(email.sender);
      // For each email create div inside a li element
      let eachEmail = `<li class="email-list-item"><div id="email-details">
                        <button style="background: ${color};" class="email" id="email${email.id}" data-email_id="${email.id}">
                          <input class="checkbox-btn" type="checkbox">
                          <input class="checkbox-btn" type="checkbox">
                          <span class="sender">${senderName}</span>
                          <span class="subject">${email.subject}</span>
                          <p class="body">${email.body}</p>
                          <span class="date-time">${dateTime}</span>
                        </button></div></li>
                        <hr>`;
      // Append email inside the email section
      emailSection += eachEmail;
    })
    // Append the emails list to the email view container 
    const emailView = document.querySelector('#emails-view');

    // Emails list container
    const emailsContainer = document.createElement('div'); /*`<div class="emails-container"></div>`*/
    emailsContainer.innerHTML = `<ul class="emails-list">${emailSection}</ul>`;

    emailView.appendChild(emailsContainer);


    // LOAD THE EMAIL WHEN IT'S CLICKED
    // First get the HTMLCollection of all the emails element
    let elements = document.querySelectorAll('.email');

    // Loop through the collection 
    Array.from(elements).forEach((element) => {
      element.addEventListener('click', function(e) {

        id = element.dataset.email_id;
        view_email(id);
        asRead(id);
      })
    })
  })
};


function view_email(email_id) {
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {

    // Create a div that display the emmail and all its details
    let displayEmail = `<div class="email-nav">
                          <button id="archive-email">archive</button>
                        </div>
                        <div class="email-content">
                          <h6>Subject: ${email.subject}</h6>
                          <span>Sender: ${email.sender}</span>
                          <span> Date: ${email.timestamp}</span>
                          <div class="email-body">
                            <p>Body: ${email.body}</p>
                          </div>
                          <button id="response-email">Respond</button>
                        </div>`;

    document.querySelector('#emails-view').innerHTML = displayEmail;

    // add event listener to the archive and response button
    document.body.addEventListener('click', function(event) {
      if (event.target.id == 'archive-email') {
        asArchived(email.id);
        console.log('Archive Button clicked');
      }
      else if ( event.target.id == 'response-email') {
        respondEmail(email);
      }
    });
  }) 
}


function asRead(email_id) {
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  })
}


function asArchived(email_id) {
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: true
    })
  })
}


function respondEmail(email) {
  compose_email();
  document.querySelector('#compose-recipients').value = `${email.sender}`;
}


function timesTamp(timestamp) {
  // Split the email timestamp and split it to an array of date and time
  let pubDate = timestamp.split(', ');
  let pubYear = pubDate[0].slice(7, ); //2023
  let dateTamp = pubDate[0].slice(0, 6); //Feb 23

  // Get the browser current date (local date and time)
  let currentDate = new Date();
  let currentYear = (currentDate.getFullYear() + ""); 
  let today = (currentDate + "").slice(4, 15);

  // Return the correct date format
  if (pubDate[0] == today) {
    return pubDate[1];

  } else if (pubYear == currentYear) {
    return dateTamp;

  } else {
    return pubDate[0];

  }
}

function getUserName(userEmail) {
  let user = userEmail.split("@");
  let userName = user[0];

  console.log(userName);
  return userName;
}

