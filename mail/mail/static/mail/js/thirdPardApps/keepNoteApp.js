import { noteApp } from "../utils/DOMmanupilation";

export const KeepNoteApp = () => {
	const myAppsDIv = document.querySelector("#thirdPart-apps");

	const noteAppContainer = noteApp();

	myAppsDIv.appendChild(noteAppContainer);
};
