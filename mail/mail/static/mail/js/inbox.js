import { KeepNoteApp } from "./thirdPardApps/keepNoteApp.js";
import {
	fetchCurrentUser,
	emailElement,
	viewEmail,
	userLog,
	userApps,
	respondOnEmail,
	emptyMailbox,
	subjectRe,
} from "./utils/DOMmanupilation.js";

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

	document
		.querySelector("#starred")
		.addEventListener("click", () => load_mailbox("starred"));
	document
		.querySelector("#spam")
		.addEventListener("click", () => load_mailbox("spam"));
	document
		.querySelector("#trash")
		.addEventListener("click", () => load_mailbox("trash"));

	document.querySelector("#compose").addEventListener("click", compose_email);

	// Send email to the compose view when the form submit
	document
		.querySelector("#compose-form")
		.addEventListener("submit", send_email);

	// By default, load the inbox
	load_mailbox("inbox");

	var windowWidth = window.innerWidth;
	console.log("Viewport width: " + windowWidth);

	var screenWidth = screen.width;
	console.log("Screen width: " + screenWidth);

	// actvite toggle button and interactive nav
	toggleButton();
	interactiveNav();

	// Set the backgound image
	setBackground();

	// For flexing the emails container div
	flexEmailsContainer();
	thirdPartApps();

	// Load the userLog and userApps modals with display none
	userLog();
	userApps();
	closeModals();

	// Expand Nav
	const expandSpan = document.querySelector("#expand-span");
	const expandIcon = document.querySelector("#expand-icon");
	const expandedNav = document.querySelector("#expand-wrapper");

	const userWallpaper = JSON.parse(localStorage.getItem("userWallpaper"));
	let currentWallpaperId = userWallpaper?.WallpaperId;

	// Expand navs btn
	document.querySelector(".expand-btn").addEventListener("click", () => {
		if (getComputedStyle(expandedNav).display === "none") {
			expandIcon.src = `static/icons/less${
				currentWallpaperId ? "_white" : ""
			}.svg`;

			expandSpan.innerHTML = "Less";
			expandedNav.style.display = "block";
		} else {
			expandIcon.src = `static/icons/expand${
				currentWallpaperId ? "_white" : ""
			}.svg`;
			expandSpan.innerHTML = "More";
			expandedNav.style.display = "none";
		}
	});
});

function compose_email() {
	// Show compose view and hide other views
	const composeView = document.querySelector("#compose-view");
	composeView.style.display = "block";

	// Clear out composition fields
	document.querySelector("#compose-recipients").value = "";
	document.querySelector("#compose-subject").value = "";
	document.querySelector("#compose-body").value = "";

	// Handle compose div minimize, maximize and close button
	let composeWidth = composeView.offsetWidth;
	// Minimize
	var minimizeCompose = false;
	document.querySelector("#minimize").addEventListener("click", () => {
		minimizeCompose = !minimizeCompose;
		if (minimizeCompose === true) {
			composeView.style.bottom = -27.5 + "em";
			composeView.style.width = composeWidth / 16 - 10 + "em";
		} else {
			composeView.style.bottom = 0;
			composeView.style.width = "31.81em";
		}
	});
	// Close
	document.querySelector("#close-compose").addEventListener("click", () => {
		composeView.style.display = "none";
	});
	// Full window
	var fullWindow = false;
	document.querySelector("#full-window").addEventListener("click", () => {
		if (fullWindow === true) {
			composeView.style.left = 2.5 + "em";
			composeView.style.bottom = 2.5 + "em";
			composeView.style.width = composeWidth / 16 + 40 + "em";
		} else {
			composeView.style.bottom = 0;
			composeView.style.width = "31.81em";
		}
	});
}

function flexEmailsContainer() {
	// Listen for clicks on the settings
	const emailsContainer = document.querySelector(".emails-content");
	const settingsContainer = document.querySelector(".settings-container");
	const settingsButton = document.querySelector("#settings");

	settingsButton.addEventListener("click", function () {
		let initialWidth = emailsContainer.offsetWidth;
		var isFlexed = emailsContainer.dataset.flexed === "true";

		if (getComputedStyle(settingsContainer).display === "none") {
			let settingsWidth = parseFloat(
				getComputedStyle(settingsContainer).width
			);
			let settingsMargin = parseFloat(
				getComputedStyle(settingsContainer).marginLeft
			);
			let shrinkWidth = initialWidth - (settingsWidth + settingsMargin);

			let newWidth =
				shrinkWidth /
					parseFloat(getComputedStyle(emailsContainer).fontSize) +
				"em";

			emailsContainer.style.maxWidth = isFlexed ? 56.5 + "em" : newWidth;

			settingsContainer.style.display = "block";

			console.log("Clicked"); // Check if the event listener is triggered
			console.log("Shrink Width:", shrinkWidth); // Check the calculated shrink width
			console.log(
				"Emails Container Width:",
				emailsContainer.style.maxWidth
			); // Check the width value applied to the emails container
			console.log(
				"Settings Container Display:",
				settingsContainer.style.display
			); // Check the display property value of the settings container
		} else {
			emailsContainer.style.maxWidth = isFlexed
				? 76.5 + "em"
				: 65.5 + "em";
			settingsContainer.style.display = "none";
		}
	});
}

function load_mailbox(mailbox) {
	// Show the mailbox and hide other views
	document.querySelector("#mailbox-view").style.display = "block";

	// Show the mailbox name
	document.querySelector(
		"#mailbox-view"
	).innerHTML = `<div class="mailbox-header">
	<div class="mailbox-container">
		<div class="mailbox">
			<img src="static/icons/primary inbox.svg" alt="" />
			<h6>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}
			</h6>
		</div>
	</div></div>`;

	//Show all emails of the mailbox
	load_emails(mailbox);
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
			// Emails list container
			const emailsContainer =
				document.createElement(
					"div"
				); /*`<div class="emails-container"></div>`*/
			emailsContainer.innerHTML = `<ul class="emails-list">${emailSection}</ul>`;

			// empty mailbox view
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
			// First get the HTMLCollection of all the emails element
			let elements = document.querySelectorAll(".email");

			// Loop through the collection
			Array.from(elements).forEach((element) => {
				element.addEventListener("click", function (event) {
					if (event.target.closest(".form-check")) {
						event.preventDefault();
						console.log(
							"checkbox is clicked ========>>>>>>>>>>><<"
						);
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
						const paginationBtn =
							document.querySelector("#pagination-btn");
						const splitBtn = document.querySelector("#split-btn");

						headerDefaultBtns.style.display = "none";
						emailHeaderBtns.style.display = "flex";
						paginationBtn.style.display = "none";
						splitBtn.style.display = "none";

						const goBackBtn = document.querySelector(".go-back");
						const navBtns =
							document.querySelectorAll(".nav-button");

						goBackBtn.addEventListener("click", () => {
							emailHeaderBtns.style.display = "none";
							headerDefaultBtns.style.display = "flex";
							paginationBtn.style.display = "flex";
							splitBtn.style.display = "flex";

							// Show the mailbox and hide other views
							const emailView =
								document.querySelector("#emails-view");
							emailView.innerHTML = "";
							const mailboxView =
								document.querySelector("#mailbox-view");
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
		});
}

function view_email(email_id) {
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
}

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

function asStarred(email) {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			starred: !email.starred,
		}),
	});
}

function asSpam(email) {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			spam: !email.spam,
		}),
	});
}

function asTrash(email) {
	//let bool = !email.archived;
	const email_id = email.id;
	fetch(`/emails/${email_id}`, {
		method: "PUT",
		body: JSON.stringify({
			trash: !email.trash,
		}),
	});
}

function thirdPartApps() {
	const myAppsDIv = document.querySelector("#thirdPart-apps");
	const emailContentDiv = document.querySelector(
		".content-settings-container"
	);
	const myAppsBtns = document.querySelectorAll(".apps-icon-wrapper");

	myAppsBtns.forEach((myAppBtn) => {
		myAppBtn.addEventListener("click", () => {
			emailContentDiv.style.maxWidth = 45.75 + "em";
			myAppsDIv.style.display = "block";

			if (myAppBtn.id === "keep-note") {
				KeepNoteApp();
			}
		});
	});
}
function addLabels() {
	const submitLabelBtn = document.querySelector("#submit-label");
	const labelNameInput = document.querySelector("#label-name");
	const parentLabelInput = document.querySelector("#parent-label");
	const nestedCheckbox = document.querySelector("#nested");
	const firstOption = document.querySelector("#option0");

	var isNested = nestedCheckbox.checked === "true";
	if (isNested) {
		firstOption.innerHTML = "Please Select a parent";

		fetch("/label/new")
			.then((response) => response.json())
			.then((labels) => {
				let index = 0; // keep track of the number of labels
				labels.forEach((label) => {
					index += 1;
					//create a new option
					const option = document.createElement("option");
					option.id = `option${index}`;
					option.style.marginLeft = `${index}em`;
					// add the option to the select input
					parentLabelInput.appendChild(option);
				});
			});
	}

	submitLabelBtn.addEventListener("click", (event) => {
		event.preventDefault();

		const labelName = labelNameInput.value.strip();
		const parentLabel = parentLabelInput.value.strip();

		fetch("/label/new", {
			mehthod: "POST",
			body: JSON.stringify({
				name: labelName,
				parent: parentLabel,
			}),
		});
	});
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

function interactiveNav() {
	var btn3bar = document.querySelector(".btn-3bar");
	var sidebar = document.querySelector(".side-bar");

	var navBtns = document.querySelectorAll(".nav-button");
	var btnContents = document.querySelectorAll(".button-content");
	var labelBtn = document.querySelector(".label-button");
	var labelContent = document.querySelector(".label-content");

	var labelNav = document.querySelector(".label-nav"); // Select all label spans
	var navLabels = document.querySelectorAll(".nav-label"); // Select all label span
	var expandMore = document.querySelector("#expand-span");
	var labelsInboxDraft = document.querySelectorAll(".inbox-count"); // Select all count spans

	var emailsContent = document.querySelector(".emails-content");
	var isFlexed = false;

	btn3bar.addEventListener("click", () => {
		isFlexed = !isFlexed;
		emailsContent.setAttribute("data-flexed", isFlexed ? "true" : "false");
		if (isFlexed) {
			labelBtn.classList.add("no-margin-left");
			sidebar.classList.add("sidebar-flexed");

			labelContent.classList.add("label-content-flexed");
			emailsContent.classList.add("emails-content-sb-flexed");
			emailsContent.style.width = 76.5 + "em";

			navBtns.forEach((navBtn) => {
				navBtn.classList.add("nav-button-flexed");
			});
			btnContents.forEach((btnContent) => {
				btnContent.classList.add("no-margin-left");
			});

			// Loop through all label spans and hide them
			navLabels.forEach((label) => {
				label.style.display = "none";
			});
			expandMore.style.display = "none";
			labelNav.style.display = "none";
			// Loop through all count spans and hide them
			labelsInboxDraft.forEach((count) => {
				count.style.display = "none";
			});
		} else {
			labelBtn.classList.remove("no-margin-left");
			sidebar.classList.remove("sidebar-flexed");
			emailsContent.classList.remove("emails-content-sb-flexed");
			emailsContent.style.width = 65.5 + "em";

			navBtns.forEach((navBtn) => {
				navBtn.classList.remove("nav-button-flexed");
			});
			btnContents.forEach((btnContent) => {
				btnContent.classList.remove("no-margin-left");
			});

			// Loop through all label spans and display them
			navLabels.forEach((label) => {
				label.style.display = "block";
			});
			expandMore.style.display = "block";
			labelNav.style.display = "block";
			// Loop through all count spans and display them
			labelsInboxDraft.forEach((count) => {
				count.style.display = "flex";
			});
		}
	});
}

function closeModals() {
	// show the userApps and useLodag modals when one of this button is cicked
	document.body.addEventListener("click", (e) => {
		if (e.target.id == "current-user") {
			const logModal = document.querySelector(".userlog-modal");
			const appsModal = document.querySelector(".apps-modal");

			logModal.style.display = "block";
			appsModal.style.display = "none";
		} else if (e.target.id === "apps-btn") {
			const logModal = document.querySelector(".userlog-modal");
			const appsModal = document.querySelector(".apps-modal");

			appsModal.style.display = "block";
			logModal.style.display = "none";
		}
	});

	// Close both modals when click event occurs outside them
	const currentUserLog = document.querySelector("#current-user");
	const currentUserApps = document.querySelector("#apps-btn");
	window.addEventListener("click", (event) => {
		const logModal = document.querySelector(".userlog-modal");
		const logChild = document.querySelector(".user-usa");

		const appsModal = document.querySelector(".apps-modal");
		const appsChild = document.querySelector(".apps");

		let clickedElement = event.target;
		if (
			clickedElement !== logModal &&
			clickedElement !== appsModal &&
			clickedElement !== currentUserLog &&
			clickedElement !== logChild &&
			clickedElement !== currentUserApps &&
			clickedElement !== appsChild
		) {
			logModal.style.display = "none";
			appsModal.style.display = "none";
		}
	});
}
// Here's the updated showUserLogModal function
function logOut() {
	document.querySelector("#logout").addEventListener("click", () => {
		fetch("/logout", {
			method: "POST",
			credentials: "same-origin",
		})
			.then((response) => {
				if (response.ok) {
					// logout successful, perform any necessary actions
					window.location.href = "/"; // redirect the user to the home page
				} else {
					console.log("Failed to logout");
				}
			})
			.catch((error) => {
				// handle any network errors
				console.log("Network error:", error);
			});
	});
}

async function setBackground() {
	var currentUser = await fetchCurrentUser();
	var userKey = `user${currentUser.id}_wallpaper`;
	const userWallpaper = JSON.parse(localStorage.getItem(userKey));
	let currentWallpaperId = userWallpaper?.WallpaperId;

	if (currentWallpaperId) {
		getWallPaper(currentWallpaperId);
	}

	changeBackground(userKey);
}

async function changeBackground(userKey) {
	// Get all wallpapers elements
	var wallPapers = document.querySelectorAll(".wallpaper-item");

	// Iterate through the wallpapers
	wallPapers.forEach((wallPaperItem) => {
		wallPaperItem.addEventListener("click", () => {
			// fetch the clicked wallpapers
			getWallPaper(wallPaperItem.id);
			const searchForm = document.querySelector("search-form");
			searchForm.classList.add(".search-theme-change");
		});
	});

	// set background to default
	const defaultTheme = document.querySelector("#default-wallpaper");
	defaultTheme.addEventListener("click", () => {
		const bodyElement = document.body;
		bodyElement.style.backgroundImage = "none";
		bodyElement.style.backgroundRepeat = "initial";
		localStorage.removeItem(userKey);
		window.location.reload();
	});
}

function getWallPaper(wallpaperId) {
	// fetch the clicked wallpaper
	fetch(`/wallpaper/${wallpaperId}`)
		.then((response) => response.json())
		.then((data) => {
			const { user, ...wallpaper } = data;
			var userWallpaper = {
				user: user,
				WallpaperId: wallpaper.id,
			};

			var userKey = `user${user.id}_wallpaper`;
			var userWallpaperString = JSON.stringify(userWallpaper);
			localStorage.setItem(userKey, userWallpaperString);

			//localStorage.setItem("selectedWallpaperId", wallpaper.id);
			// change the background of the website when one of them is clicked on
			const bodyElement = document.body;
			bodyElement.style.backgroundImage = `url(${wallpaper.image_url})`;
			bodyElement.style.backgroundRepeat = "no-repeat";
			bodyElement.style.backgroundSize = "cover";

			// Change Colors themes
			var bool = true;
			colorsTheme();
			iconThemes(bool);
		});
}

const colorsTheme = () => {
	// Access the css variables
	const root = document.documentElement;
	root.style.setProperty("--nav-color", "rgba(255, 255, 255, 0.25)");
	root.style.setProperty("--nav-text-color", "rgba(255, 255, 255, 1)");
	root.style.setProperty("--active-nav", "rgba(255, 255, 255, 0.35)");
	root.style.setProperty("--compose-color", "#fff");
	root.style.setProperty("--search-bar", "rgba(255, 255, 255, 0.35)");
	root.style.setProperty("--white-color", "rgba(255,255,255,0.8)");

	root.style.setProperty("--userlog-color", "rgba(44, 46, 47, 1)");
	root.style.setProperty("--usercard-color", "rgba(31, 31, 30, 1)");
	root.style.setProperty("--apps-card-color", "rgba(31, 31, 30, 1)");
	root.style.setProperty("--userlog-text-color", "rgba(255, 255, 254, 1)");
	root.style.setProperty("--terms-color", "rgba(255, 255, 254, 1)");
	root.style.setProperty("--usa-btn-color", "rgba(255, 255, 250, 0.15)");
	root.style.setProperty("--apps-link-hover", "rgba(44, 46, 47, 1)");

	/*const emailItems = document.querySelectorAll(".email");
	emailItems.forEach((emailItem) => {
		const emailStatus = emailItems.dataset.email_status;
		emailItems.style.background = emailStatus
			? "transparent;"
			: "rgba(0, 0, 0, 0.15);";
	});*/
};

const iconThemes = (switchBool) => {
	const usaBtns = document.querySelectorAll(".usa-btn");
	usaBtns.forEach((usaBtnsItem) => {
		switch (usaBtnsItem.id) {
			case "settings-icon":
				usaBtnsItem.src = `static/icons/settings${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "apps-btn":
				usaBtnsItem.src = `static/icons/group-apps${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "menu":
				usaBtnsItem.src = `static/icons/3bars menu ${
					switchBool ? "white" : ""
				}.svg`;
				break;
			case "support-icon":
				usaBtnsItem.src = `static/icons/help${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "logo-text":
				usaBtnsItem.src = `static/icons/Mailer${
					switchBool ? "_white" : ""
				}.svg`;
				break;
		}
	});

	const navIcons = document.querySelectorAll(".nav-icons");
	navIcons.forEach((navIconsItem) => {
		switch (navIconsItem.id) {
			case "inbox-icon":
				navIconsItem.src = `static/icons/inbox${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "star-icon":
				navIconsItem.src = `static/icons/starred${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "archive-icon":
				navIconsItem.src = `static/icons/archived${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "sent-icon":
				navIconsItem.src = `static/icons/sent${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "draft-icon":
				navIconsItem.src = `static/icons/draft${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "expand-icon":
				navIconsItem.src = `static/icons/expand${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "spam-icon":
				navIconsItem.src = `static/icons/spam${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "trash-icon":
				navIconsItem.src = `static/icons/trash${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "add-icon":
				navIconsItem.src = `static/icons/add${
					switchBool ? "_white" : ""
				}.svg`;
				break;
			case "note-icon":
				navIconsItem.src = `static/icons/notes${
					switchBool ? "_white" : ""
				}.svg`;
				break;
		}
	});
};
