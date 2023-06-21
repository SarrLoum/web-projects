import {
	emailElement,
	viewEmail,
	userLog,
	respondOnEmail,
	subjectRe,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
	// Use buttons to toggle between views
	document
		.querySelector("#inbox")
		.addEventListener("click", () => load_mailbox("inbox"));
	document
		.querySelector("#sent")
		.addEventListener("click", () => load_mailbox("sent"));
	document
		.querySelector("#archived")
		.addEventListener("click", () => load_mailbox("archive"));
	document.querySelector("#compose").addEventListener("click", compose_email);

	// Send email to the compose view when the form submit
	document
		.querySelector("#compose-form")
		.addEventListener("submit", send_email);

	// actvite toggle button
	toggleButton();
	// By default, load the inbox
	load_mailbox("inbox");

	// Listen for clicks on the settings
	const emailsContainer = document.querySelector(".emails-content");
	const settingsContainer = document.querySelector(".settings-container");
	const settingsButton = document.querySelector("#settings");

	let initialWidth = emailsContainer.offsetWidth;
	settingsButton.addEventListener("click", function () {
		if (settingsContainer.style.display === "none") {
			let shrinkWidth =
				initialWidth -
				(parseFloat(getComputedStyle(settingsContainer).marginLeft) +
					parseFloat(getComputedStyle(settingsContainer).width));
			emailsContainer.style.width =
				shrinkWidth /
					parseFloat(getComputedStyle(emailsContainer).fontSize) +
				"em";
			settingsContainer.style.display = "block";

			console.log("Clicked"); // Check if the event listener is triggered
			console.log("Shrink Width:", shrinkWidth); // Check the calculated shrink width
			console.log("Emails Container Width:", emailsContainer.style.width); // Check the width value applied to the emails container
			console.log(
				"Settings Container Display:",
				settingsContainer.style.display
			); // Check the display property value of the settings container
		} else {
			let shrinkWidth =
				emailsContainer.offsetWidth +
				(parseFloat(getComputedStyle(settingsContainer).marginLeft) +
					parseFloat(getComputedStyle(settingsContainer).width));
			emailsContainer.style.width =
				shrinkWidth /
					parseFloat(getComputedStyle(emailsContainer).fontSize) +
				"em";
			settingsContainer.style.display = "none";
		}
	});

	// Load the userLog modal with display none
	userLog();
	const currentUserLog = document.querySelector(".current-user");
	currentUserLog.addEventListener("click", showUserLogModal);
});

function compose_email() {
	// Show compose view and hide other views
	document.querySelector("#compose-view").style.display = "block";

	// Clear out composition fields
	document.querySelector("#compose-recipients").value = "";
	document.querySelector("#compose-subject").value = "";
	document.querySelector("#compose-body").value = "";
}

function load_mailbox(mailbox) {
	// Show the mailbox and hide other views
	document.querySelector("#emails-view").style.display = "block";

	// Show the mailbox name
	document.querySelector(
		"#emails-view"
	).innerHTML = `<div class="mailbox-header"><div class="mailbox">
	<img src="static/icons/inbox.svg" alt="" />
	<h6>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h6></div></div><hr>`;

	//Show all emails of the mailbox
	load_emails(mailbox);
}

function toggleButton() {
	let navs = document.querySelectorAll(".nav-button");

	// Set the Inbox button as active by default
	document.getElementById("inbox").classList.add("active");

	navs.forEach((navButton) => {
		navButton.addEventListener("click", () => {
			// Remove the active class from all buttons
			navs.forEach((otherButton) => {
				otherButton.classList.remove("active");
			});

			// Add the active class to the clicked button
			navButton.classList.add("active");
		});
	});
}

function send_email(event) {
	// Prevent default browser response to events
	event.preventDefault();

	// Send the form to the view to store inputs in database
	fetch("/emails", {
		method: "POST",
		body: JSON.stringify({
			recipients: document.querySelector("#compose-recipients").value,
			subject: document.querySelector("#compose-subject").value,
			body: document.querySelector("#compose-body").value,
		}),
	})
		.then((response) => response.json())
		.then((result) => {
			console.log(result);
		});

	// Refresh page
	window.location.reload();
}

function load_emails(mailbox) {
	// Get a list of all the emails of the mailbox via a get request to api
	fetch(`/emails/${mailbox}`)
		.then((response) => response.json())
		.then((emails) => {
			// Create an empty email section
			let emailSection = "";
			// Iterate through emails
			emails.forEach((email) => {
				// For each email create div inside a li element
				let eachEmail = emailElement(email);

				// Append email inside the email section
				emailSection += eachEmail;
			});
			// Append the emails list to the email view container
			const emailView = document.querySelector("#emails-view");

			// Emails list container
			const emailsContainer =
				document.createElement(
					"div"
				); /*`<div class="emails-container"></div>`*/
			emailsContainer.innerHTML = `<ul class="emails-list">${emailSection}</ul>`;

			emailView.appendChild(emailsContainer);

			// LOAD THE EMAIL WHEN IT'S CLICKED
			// First get the HTMLCollection of all the emails element
			let elements = document.querySelectorAll(".email");

			// Loop through the collection
			Array.from(elements).forEach((element) => {
				element.addEventListener("click", function (event) {
					if (
						event.target.tagName.toLowerCase() === "input" &&
						event.target.type === "checkbox"
					) {
						// The click event occurred on the checkbox element, toggle its status
						event.stopPropagation();
						//event.target.checked = !event.target.checked;
						console.log("checkbox clicked");
					} else if (!event.target.closest(".email .checkbox-ul")) {
						// The click event occurred on some other element, display the email view
						const id = element.dataset.email_id;
						view_email(id);
						asRead(id);
						console.log("email clicked");
					}
				});
			});
		});
}

function view_email(email_id) {
	fetch(`/emails/${email_id}`)
		.then((response) => response.json())
		.then((email) => {
			// Create a div that display the emmail and all its details
			let displayEmail = viewEmail(email);

			document.querySelector("#emails-view").innerHTML = displayEmail;

			// add event listener to the archive and response button
			document.body.addEventListener("click", function (event) {
				if (event.target.id == "archive-email") {
					asArchived(email);
					console.log("Archive Button clicked");
				} else if (event.target.id == "response-email") {
					respondEmail(email);
				}
			});
		});
}

function asRead(email_id) {
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			read: true,
		}),
	});
}

function asArchived(email) {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			archived: !email.archived,
		}),
	});
}

function respondEmail(email) {
	console.log("respond email is called");
	compose_email();
	let subject = subjectRe(email);

	document.querySelector(
		"#compose-recipients"
	).value = `${email.sender.email}`;

	document.querySelector("#compose-subject").value = `${subject}`;

	let senderMessage = `<div class="email-sender">
                            <div class'sender-avatar'>
                                <img
                                    src=""
                                    alt="sender avatar"
                                />
                                <span>On ${email.timestamp} ${email.sender.email} </pan>
                            </div>
                        </div>
						<p>${email.body}</p>`;

	document.querySelector("#sent-email").innerHTML = senderMessage;
}

function showUserLogModal() {
	console.log("userLog clicked");
	const logModal = document.querySelector(".userlog-modal");
	logModal.style.display = "block";

	// Hide the element after 15 seconds
	setTimeout(() => {
		if (logModal.onClick === false) {
			logModal.style.display = "none";
		}
	}, 15000);
}
