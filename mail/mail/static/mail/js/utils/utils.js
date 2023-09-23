import {
	emailElement,
	viewEmail,
	emptyMailbox,
	respondOnEmail,
} from "./DOMmanipulation.js";

import {
	fetchCurrentUser,
	asRead,
	asArchived,
	asStarred,
	asSpam,
	asTrash,
} from "./apiCalls.js";

export const displayEmails = (emails) => {
	// Create an empty email section
	let emailSection = "";
	// Iterate through emails
	emails.forEach((email) => {
		// For each email create div inside a li element
		let eachEmail = emailElement(email);

		// Append email inside the email section
		emailSection += eachEmail;
	});
	// Emails list container
	const emailsContainer =
		document.createElement(
			"div"
		); /*`<div class="emails-container"></div>`*/

	emailsContainer.innerHTML = `<ul class="emails-list">${emailSection}</ul>`;

	// empty mailbox view
	let mailbox = "empliment later";
	let emptyView = emptyMailbox(mailbox);

	// Append the emails list to the email view container
	const emailView = document.querySelector("#mailbox-view");

	// Render ddinamically the mailbox view wheither it's empty or not
	if (emails.length === 0) {
		emailView.appendChild(emptyView);
	} else {
		emailView.appendChild(emailsContainer);
	}
	// LOAD THE EMAIL WHEN IT'S CLICKED
	handleClickOnEmail();
};

// Handle user's click on email
const handleClickOnEmail = () => {
	// First get the HTMLCollection of all the emails element
	let elements = document.querySelectorAll(".email");

	// Loop through the collection
	Array.from(elements).forEach((element) => {
		element.addEventListener("click", function (event) {
			const target = event.target;
			if (target.closest(".checkbox")) {
				event.preventDefault();
				console.log("checkbox 1 is clicked <<<<<<<<<<<<<<<<<<<<");
			} else if (target.closest(".checkbox-star")) {
				event.preventDefault();
				console.log("checkbox-star is clicked >>>>>>>>>>>>>>>>>>");
			} else if (target.closest(".checkbox-important")) {
				event.preventDefault();
				console.log("checkbox-import is clicked ***************");
			} else if (!event.target.closest(".email .form-check")) {
				// The click event occurred on some other element, display the email view
				console.log("email clicked");
				const id = element.dataset.email_id;
				view_email(id);
				asRead(id);
				const headerDefaultBtns = document.querySelector(
					"#header-left-default"
				);
				const emailHeaderBtns =
					document.querySelector("#header-left-email");
				const paginationBtn = document.querySelector("#pagination-btn");
				const splitBtn = document.querySelector("#split-btn");

				headerDefaultBtns.style.display = "none";
				emailHeaderBtns.style.display = "flex";
				paginationBtn.style.display = "none";
				splitBtn.style.display = "none";

				const goBackBtn = document.querySelector(".go-back");
				const navBtns = document.querySelectorAll(".nav-button");

				goBackBtn.addEventListener("click", () => {
					emailHeaderBtns.style.display = "none";
					headerDefaultBtns.style.display = "flex";
					paginationBtn.style.display = "flex";
					splitBtn.style.display = "flex";

					// Show the mailbox and hide other views
					const emailView = document.querySelector("#emails-view");
					emailView.innerHTML = "";
					const mailboxView = document.querySelector("#mailbox-view");
					mailboxView.style.display = "block";

					/*navBtns.forEach((navBtn) => {
						if (navBtn.classList.contains("active")) {
							//load_mailbox(navBtn.id);
						}
					});*/
				});
			}
		});
	});
};

// Show email view when a user click occurs on it
const view_email = (email_id) => {
	fetch(`/emails/${email_id}`)
		.then((response) => response.json())
		.then((email) => {
			// Show the mailbox and hide other views
			document.querySelector("#mailbox-view").style.display = "none";

			// Create a div that display the emmail and all its details
			let displayEmail = viewEmail(email);

			const root = document.documentElement;
			const emailView = document.querySelector("#emails-view");
			emailView.innerHTML = displayEmail;
			root.style.setProperty("--email-color", "#fff");

			// add event listener to the archive and response button
			document.body.addEventListener("click", function (event) {
				if (event.target.id == "archive-email") {
					asArchived(email);
				} else if (event.target.id == "response-email") {
					respondEmail(email);
				}
			});
		});
};

function respondEmail(email) {
	document.querySelector("#rf-btns").style.display = "none";
	respondOnEmail(email);

	// Load the compose modal with respond properties
	document.body.addEventListener("click", (event) => {
		if (event.target.id === "full-img") {
			document.querySelector(".respond-wrapper").style.display = "none";
			document.querySelector(".other-instance").style.display = "block";
			document
				.querySelector(".respond-container")
				.classList.add("align-instance");

			compose_email();
			let subject = subjectRe(email);

			document.querySelector(
				"#compose-recipients"
			).value = `${email.sender.email}`;

			document.querySelector(
				"#response-subject"
			).innerHTML = `${subject}`;
			const responseSubject = document.querySelector("#compose-subject");
			responseSubject.value = `${subject}`;
			responseSubject.setAttribute("hidden", true);

			console.log("sender email:", email.sender.email);
		} else if (event.target.id === "close-compose") {
			document.querySelector(".respond-wrapper").style.display = "block";
			document.querySelector(".other-instance").style.display = "none";
		}
	});
}

export function timesTamp(timestamp) {
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

export function getUserName(userEmail) {
	let user = userEmail.split("@");
	let userName = user[0];

	console.log(userName);
	return userName;
}

export function subjectRe(email) {
	if (email.subject.startsWith("Re: ")) {
		return email.subject;
	} else {
		return `Re: ${email.subject}`;
	}
}

export function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop().split(";").shift();
	}
}
