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

    emails.forEach((email) => {
      // For each email create div inside a li element
      let eachEmail = `<li class="email-list-item">
                    <div id="email-details">
                      <button style="background: none; border: none; text-align: left;" class="email" id="email${email.id}" data-email_id="${email.id}">
                        <h5 class="subject">${email.subject}</h5>
                        <p class="body">${email.body}</p>
                        <span class="sender">${email.sender}</span>
                        <span>${email.timestamp}
                        </span>
                      </button>
                    </div>
                  </li>`;
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
    let elements = document.getElementsByClassName('email');

    // Loop through the collection 
    Array.from(elements).forEach((element) => {
      element.addEventListener('click', function() {
        console.log('Baw hello');
        id = element.dataset.email_id;
        view_email(id);
        asRead(id);
        element.target.style.BackgroundColor = '#F2F5FC';
      })
    })
  })
};

function view_email(email_id) {
  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {
    let displayEmail = `<div class="email-nav">
                          <button id="archive">archive</button>
                        </div>

                        <div class="email-content">
                          <h6>Subject: ${email.subject}</h6>
                          <span>Sender: ${email.sender}</span>
                          <span> Date: ${email.timestamp}</span>
                          <div class="email-body">
                            <p>Body: ${email.body}</p>
                          </div>
                          <button id="response">Respond</button>
                        </div>`;


    document.querySelector('#emails-view').innerHTML = displayEmail;
    console.log('From the view_email function');
    console.log(id);
  }) 
  /*<script>
  document.querySelecor('#response').addEventListener('click', function() {
    console.log('The response button is clicked');
  });
</script>*/

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

// separator COL ?ROW?     Change the column and row separators
// .mode MODE ?TABLE?       Set output mode
// .headers on|off          Turn display of headers on or off
// .excel                   Display the output of next command in spreadsheet
// .width NUM1 NUM2 ...     Set column widths for "column" mode
