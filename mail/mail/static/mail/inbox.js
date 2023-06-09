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
});

function compose_email() {
	// Show compose view and hide other views
	document.querySelector("#emails-view").style.display = "none";
	document.querySelector("#compose-view").style.display = "block";

	// Clear out composition fields
	document.querySelector("#compose-recipients").value = "";
	document.querySelector("#compose-subject").value = "";
	document.querySelector("#compose-body").value = "";
}

function load_mailbox(mailbox) {
	// Show the mailbox and hide other views
	document.querySelector("#emails-view").style.display = "block";
	document.querySelector("#compose-view").style.display = "none";

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

	// Load the sent mailbox
	load_mailbox("sent");
}

function load_emails(mailbox) {
	// Get a list of all the emails of the mailbox via a get request to api
	fetch(`/emails/${mailbox}`)
		.then((response) => response.json())
		.then((emails) => {
			// Create an empty email section
			let emailSection = "";
			let color = "";

			emails.forEach((email) => {
				// Change background color if the email is read
				if (email.read == true) {
					color = "#F2F5FC";
				} else {
					color = "#fff";
				}

				// Format timestamp
				let dateTime = timesTamp(email.timestamp);
				//format the subject
				let senderName = getUserName(email.sender);
				// For each email create div inside a li element
				let eachEmail = `<li class="email-list-item"><div id="email-details">
                        <div style="background: ${color};" class="email" id="email${email.id}" role="button" data-email_id="${email.id}">
							<div class="checkbox-container">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
								</div>
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
								</div>
							</div>
							<span class="sender-preview preview-font">${senderName}</span>
                    		<div class="subject-body">
								<span class="subject-preview preview-font">${email.subject}</span> - 
								<span class="body-preview">${email.body}</span>
                    		</div>
                        	<span class="datetime-preview preview-font">${dateTime}.</span>
                        </div>
                    	</div></li><hr>`;

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
			// Email sender's name
			let senderName = email.sender.slice(0, email.sender.indexOf("@"));
			let sender_avatar = email.sender_avatar.replace("/", "");
			// Create a div that display the emmail and all its details
			let displayEmail = `
			<div class="email-subject flex justify">
				<h2>Subject: ${email.subject}</h2>
				<a href="#" id="archive-email">
					<img src="static/icons/archived.svg" alt=""/>
				</a>
			</div>
			<div class="flex">
				<div class="sender-avatar">
					<div class="avatar-container">
						<img src="http://localhost:8000/media/bellamy.jpg" alt="" />
					</div>
				</div>
				<div class="body-container grow">
					<div class="email-header">
					<table>
						<tr class="first-row flex">
							<td class="first-column">
								<span class="sender-span1">${senderName}</span>
								<span class="sender-span2">&lt;${email.sender}&gt;</span>
							</td>
							<td class="second-column">
								<span>${email.timestamp}</span>
								<a class="icon-starred" href="#" id="star-email">
									<img src="static/icons/starred.svg" alt=""/>
								</a>
							</td>
							<td class="third-column">
							<a class="icon-reply" href="#" id="response-email">
							<img src="static/icons/reply.svg" alt=""/>
							</a>
							<a class="icon-more" href="#" id="response-email">
								<img src="static/icons/more.svg" alt=""/>
							</a>
							</td>
						</tr>
						<tr class="second-row">
							<td class="first-column"><span>to me</span></td>
						</tr>
					</table>
				
					</div>
					<div class="email-body">
						<p>${email.body}</p>
					</div>
					<div class="rf-btn-container flex">
						<div class="respond-btn">
							<a href="#" id="response-email">
									<img src="static/icons/reply.svg" alt="" >
									<span>Response</span>
							</a>
						</div>
						<div class="forward-btn">
							<a href="#" id="response-email">
									<img src="static/icons/reply.svg" alt="" >
									<span>Forward</span>
							</a>
						</div>
					</div>
				</div>
			</div>`;

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
	compose_email();
	let subject = "";
	if (email.subject.startsWith("Re: ")) {
		subject = email.subject;
	} else {
		subject = `Re: ${email.subject}`;
	}
	document.querySelector("#compose-recipients").value = `${email.sender}`;

	document.querySelector("#compose-subject").value = `${subject}`;

	let senderMessage = `<div class="email-sender">
                            <div class'sender-avatar'>
                                <img
                                    src=""
                                    alt="sender avatar"
                                />
                                <span>On ${email.timestamp} ${email.sender} </pan>
                            </div>
                        </div>
						<p>${email.body}</p>`;

	document.querySelector("#sent-email").innerHTML = senderMessage;
}

function timesTamp(timestamp) {
	// Split the email timestamp and split it to an array of date and time
	let pubDate = timestamp.split(", ");
	let pubYear = pubDate[0].slice(7); //2023
	let dateTamp = pubDate[0].slice(0, 6); //Feb 23

	// Get the browser current date (local date and time)
	let currentDate = new Date();
	let currentYear = currentDate.getFullYear() + "";
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
