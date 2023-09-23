import { searchEmail } from "./mailApp.js";
import { KeepNoteApp } from "./thirdPartApps/keepNoteApp.js";
import { displayEmails, subjectRe } from "./utils/utils.js";
import { userLog, userApps, respondOnEmail } from "./utils/DOMmanipulation.js";
import {
	fetchCurrentUser,
	asRead,
	asArchived,
	asStarred,
	asSpam,
	asTrash,
} from "./utils/apiCalls.js";

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
		.querySelector("#important")
		.addEventListener("click", () => load_mailbox("important"));
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

	// Handle email's search
	searchEmail();

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
	var sidebar = document.querySelector(".side-bar");
	const emailsContainer = document.querySelector(".emails-content");
	const settingsContainer = document.querySelector(".settings-container");
	const myAppsDIv = document.querySelector("#thirdPart-apps");
	const settingsButton = document.querySelector("#settings");

	settingsButton.addEventListener("click", function () {
		if (getComputedStyle(settingsContainer).display === "none") {
			if (!sidebar.classList.contains("sidebar-flexed")) {
				emailsContainer.style.maxWidth = "71%";
			} else {
				emailsContainer.style.maxWidth = "74.5%";
			}

			if (myAppsDIv.style.display === "block") {
				emailsContainer.style.maxWidth = "61%";
			} else {
				emailsContainer.style.maxWidth = "71%";
			}

			settingsContainer.style.display = "block";
		} else {
			emailsContainer.style.maxWidth = "100%";
			settingsContainer.style.display = "none";
		}
	});
}

function load_mailbox(mailbox) {
	// Show the mailbox and hide other views
	const emailView = document.querySelector("#mailbox-view");
	const contentHeader0 = document.querySelector(".content-header0");
	emailView.style.display = "block";

	// Clear the mailbox view
	emailView.innerHTML = "";

	// Show the mailbox name
	if (mailbox === "inbox") {
		contentHeader0.style.display = "none";
		emailView.innerHTML = `<div class="mailbox-header">
		<di class="mailbox-container">
			<div class="mailbox">
				<img src="static/icons/primary inbox.svg" alt="" />
				<h6>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h6>
			</div>
		</di</div>`;

		// Show all emails of the mailbox
		load_emails(mailbox);
	} else {
		contentHeader0.style.display = "flex";
		//document.querySelector(".mailbox-header").style.display = "none";

		// Show all emails of the mailbox
		load_emails(mailbox);
	}
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
			// display the emails
			displayEmails(emails);
		});
}

function thirdPartApps() {
	var sidebar = document.querySelector(".side-bar");
	const myAppsDIv = document.querySelector("#thirdPart-apps");
	const emailsContent = document.querySelector(".emails-content");
	const settingsContainer = document.querySelector(".settings-container");
	const emailContentDiv = document.querySelector(
		".content-settings-container"
	);
	const myAppsBtns = document.querySelectorAll(".apps-icon-wrapper");

	myAppsBtns.forEach((myAppBtn) => {
		myAppBtn.addEventListener("click", () => {
			if (!sidebar.classList.contains("sidebar-flexed")) {
				emailContentDiv.style.maxWidth = 46.85 + "em";
			} else {
				emailContentDiv.style.maxWidth = 57.85 + "em";
			}

			const isSettingsDisplayed = settingsContainer.style.display;
			if (isSettingsDisplayed === "block") {
				emailsContent.style.maxWidth = "61%";
			} else {
				emailsContent.style.maxWidth = "100%";
			}

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

	const emailsContent = document.querySelector(".emails-content");
	const settingsContainer = document.querySelector(".settings-container");
	const emailContentDiv = document.querySelector(
		".content-settings-container"
	);

	var isFlexed = false;
	btn3bar.addEventListener("click", () => {
		isFlexed = !isFlexed;

		if (isFlexed) {
			labelBtn.classList.add("no-margin-left");
			sidebar.classList.add("sidebar-flexed");
			labelContent.classList.add("label-content-flexed");
			emailContentDiv.classList.add("emails-content-sb-flexed");

			emailContentDiv.style.maxWidth = 76.5 + "em";

			const isSettingsDisplayed = settingsContainer.style.display;
			if (isSettingsDisplayed === "block") {
				emailsContent.style.maxWidth = "74.5%";
			} else {
				emailsContent.style.maxWidth = "100%";
			}
			navBtns.forEach((navBtn) => {
				navBtn.classList.add("nav-button-flexed");
			});
			btnContents.forEach((btnContent) => {
				btnContent.classList.add("no-margin-left");
			});

			// Hide hide expand more and label nav
			expandMore.style.display = "none";
			labelNav.style.display = "none";
			// Loop through all label spans and hide them
			navLabels.forEach((label) => {
				label.style.display = "none";
			});
			// Loop through all count spans and hide them
			labelsInboxDraft.forEach((count) => {
				count.style.display = "none";
			});
		} else {
			labelBtn.classList.remove("no-margin-left");
			sidebar.classList.remove("sidebar-flexed");
			emailContentDiv.classList.remove("emails-content-sb-flexed");

			emailContentDiv.style.maxWidth = 65.5 + "em";

			const isSettingsDisplayed = settingsContainer.style.display;
			if (isSettingsDisplayed === "block") {
				emailsContent.style.maxWidth = "74.5%";
			} else {
				emailsContent.style.maxWidth = "100%";
			}

			navBtns.forEach((navBtn) => {
				navBtn.classList.remove("nav-button-flexed");
			});
			btnContents.forEach((btnContent) => {
				btnContent.classList.remove("no-margin-left");
			});

			// how expand more and labelNav
			expandMore.style.display = "block";
			labelNav.style.display = "block";

			// Loop through all label spans and display them
			navLabels.forEach((label) => {
				label.style.display = "block";
			});
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
			const searchForm = document.querySelector(".search-form");
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
