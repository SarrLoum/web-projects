import { noteApp } from "../utils/DOMmanipulation.js";
import {
	loadNoteForm,
	loadListNoteForm,
	noteItemWidget,
} from "../utils/components.js";

export const KeepNoteApp = () => {
	// Container Element
	const myAppsDIv = document.querySelector("#thirdPart-apps");
	const emailContentDiv = document.querySelector(
		".content-settings-container"
	);
	// Load the note app
	var noteAppContainer = noteApp();
	myAppsDIv.innerHTML = "";
	myAppsDIv.appendChild(noteAppContainer);

	// Note Divs element
	const noteAppHome = document.querySelector("#noteApp-home");
	const noteAppBody = document.querySelector("#noteApp-body");
	const addNoteWrapper = noteAppBody.querySelector("#addNote-wrapper");
	const noteListBtnDiv = document.querySelector("#newNote-newList");
	const noteAppWrapper = document.querySelector(".noteApp-wrapper");

	// Functional button
	const newNoteBtn = document.querySelector("#newNote");
	const listNoteBtn = document.querySelector("#newList");
	const searchNoteBtn = document.querySelector("#search-note");
	const closeMyAppsBtn = document.querySelector("#closeApp-btn");

	// Get emailContent current max width
	let maxWidth =
		parseFloat(getComputedStyle(emailContentDiv).maxWidth) /
		parseFloat(getComputedStyle(emailContentDiv).fontSize);

	// ADD EVENT LISTENER
	// Close the third Apps div
	closeMyAppsBtn.addEventListener("click", () => {
		console.log("close myapp btn is clicked");
		myAppsDIv.style.display = "none";
		noteAppWrapper.style.display = "none";
		emailContentDiv.style.maxWidth = `${maxWidth + 18.65}em`;
	});

	var noteMap = {
		title: "",
		note: "",
	};

	// for new note
	newNoteBtn.addEventListener("click", () => {
		noteAppHome.style.display = "none";
		noteListBtnDiv.style.display = "none";

		addNoteWrapper.innerHTML = "";
		noteAppBody.style.display = "block";

		var noteForm = loadNoteForm();
		addNoteWrapper.appendChild(noteForm);

		const noteListDiv = document.querySelector(".noteList-div");
		const noteTitleInput = document.querySelector("#noteList-title");
		const noteInput = document.querySelector("#noteList-body");

		noteTitleInput.addEventListener("input", () => {
			noteMap.title = noteTitleInput.value;
		});

		noteInput.addEventListener("input", () => {
			noteMap.note = noteInput.value;
		});

		const addNoteBtn = document.querySelector("#add-note-list");
		addNoteBtn.addEventListener("click", () => {
			noteListBtnDiv.style.display = "flex";
			noteListDiv.style.display = "none";

			console.log("New note title:", noteMap.title);
			console.log("New note body:", noteMap.note);
		});
	});

	// FOR ADDING A NEW NOTE LIST
	listNoteBtn.addEventListener("click", () => {
		noteAppHome.style.display = "none";
		noteListBtnDiv.style.display = "none";

		// Clean the wrapper content
		addNoteWrapper.innerHTML = "";
		noteAppBody.style.display = "block";

		// Load add note list form
		var noteForm = loadListNoteForm("new note");
		addNoteWrapper.appendChild(noteForm);

		// Containers and input element
		const noteListDiv = document.querySelector(".noteList-div");
		const noteListItemsDiv = document.querySelector("#note-list-items");
		const noteTitleInput = document.querySelector("#noteList-title");
		const listNoteInput = document.querySelector(".noteList-body2");

		// add event listener to the tilte input
		noteTitleInput.addEventListener("input", () => {
			noteMap.title = noteTitleInput.value;
			console.log("title working :", noteMap.title);
		});

		let itemIndex = 0;
		listNoteInput.addEventListener("input", () => {
			let tempInputValue = listNoteInput.value;
			if (tempInputValue.length >= 1 && tempInputValue.length != 0) {
				// remove focus
				listNoteInput.blur();

				// load the new note item widget
				++itemIndex;
				let noteItem = noteItemWidget(false, itemIndex);
				noteListItemsDiv.appendChild(noteItem);
				//  get the new note item input
				const currentNoteItem = document.querySelector(
					`#noteList-item${itemIndex}`
				);

				// fill the new note item input with the value inputed and put focus on it
				currentNoteItem.value = listNoteInput.value;
				listNoteInput.value = "";
				currentNoteItem.focus();
			}
		});

		// Note List items checkboxes
		const checkedNotesWrapper = document.querySelector(
			".checked-notes-wrapper"
		);
		const checkedNotesDiv = document.querySelector(".checked-notes");
		const noteItems = document.querySelectorAll(".noteItem");

		let itemIndex2 = 0;
		noteItems.forEach((noteItem) => {
			console.log("Element note item: ", noteItem);

			noteItem.addEventListener("mouseenter", () => {
				console.log("mouse entered note item");
				const closeNoteItem = noteItem.querySelector(".close-noteItem");
				closeNoteItem.style.display = "flex";
			});

			noteItem.addEventListener("click", (event) => {
				console.log("mouse entered note item");
				let target = event.target;
				if (target.classList.contains("close-noteItem")) {
					noteItem.remove();
				}

				if (target.classList.contains("item-checkbox")) {
					console.log("checked Btn clicked");
					const noteValue = noteItem.querySelector("input").value;
					var isChecked = target.classList.contains("checked");
					if (!isChecked) {
						noteItem.remove();

						++itemIndex2;
						checkedNotesDiv.style.display = "flex";
						let noteItemChecked = noteItemWidget(true, itemIndex2);
						checkedNotesDiv.appendChild(noteItemChecked);

						//  get the new note item input
						const currentNoteItem = document.querySelector(
							`#noteList-item${itemIndex}`
						);
						currentNoteItem.value = noteValue;
					}
				}
			});
		});

		const addNoteBtn = document.querySelector("#add-note-list");
		addNoteBtn.addEventListener("click", () => {
			noteListBtnDiv.style.display = "flex";
			noteListDiv.style.display = "none";

			console.log("New note title:", noteMap.title);
			console.log("New note body:", noteMap.note);
		});
	});

	// Note Items button
	const noteMenu = document.querySelectorAll("#note-menu");
	const pinNote = document.querySelectorAll("#pin-note");

	noteMenu.addEventListener("click", () => {});
};
