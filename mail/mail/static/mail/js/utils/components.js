export const loadNoteForm = () => {
	const noteListDiv = document.createElement("div");
	noteListDiv.classList.add("noteList-div");

	let noteListContent = `
            <div id="noteList-form" class="noteList-form">
                <div class="note-titleInput flex">
                    <input id="noteList-title" class="grow" type="text" name="title" placeholder="Title"/>
                    <div class="noteControl-Btns flex">
                        <button id="note-menu" class="noteApp-btns"><img src="static/icons/noteApp-icons/more.svg" alt=""/></button>
                        <button id="pin-note" class="noteApp-btns"><img src="static/icons/noteApp-icons/pin.svg" alt=""/></button>
                    </div>
                </div>
                <div class="note-bodyInput">
                    <input id="noteList-body" autofocus type="text" name="title" placeholder="Take a note..."/>
                </div>
                <div class="flex align-center justify-end"><button id="add-note-list"  class="add-noteList">Done</button></div>
            </div>
    `;

	noteListDiv.innerHTML = noteListContent;
	return noteListDiv;
};

export const loadListNoteForm = (wichType) => {
	var isAddNote = wichType === "new note" ? true : false;
	const noteListDiv = document.createElement("div");
	noteListDiv.classList.add("noteList-div");

	let noteListContent = `
            <div id="noteList-form" class="noteList-form">

                <div class="note-titleInput flex">
                    <input id="noteList-title" class="grow" type="text" name="title" placeholder="Title"/>
                    
                    <div class="noteControl-Btns flex">
                        <button class="note-menu noteApp-btns"><img src="static/icons/noteApp-icons/more.svg" alt=""/></button>
                        <button class="pin-note noteApp-btns"><img src="static/icons/noteApp-icons/pin.svg" alt=""/></button>
                    </div>
                </div>
                
                <div id="note-list-items"></div>

                <div class="note-bodyInput list-noteItem flex align-center gap2">
                    <button class="noteApp-btns no-padding"><img src="static/icons/noteApp-icons/plus.svg" alt=""/></button>
                    <input class="noteList-body2" autofocus type="text" name="title" placeholder="Take a note..."/>
                </div>

                <div class="checked-notes-wrapper">
                    <div class="flex align-center gap2">
                    <button class="checked-show"><img class="show-hide" src="static/icons/noteApp-icons/hide.svg" alt="" /></button>
                    <button class="checked-count"></button>
                    </div>
                    <div class="checked-notes flex column gap3"></div>
                </div>   
                
                <div class="flex align-center justify-end"><button id="add-note-list" class="add-noteList">Done</button></div>
            </div>
    `;

	noteListDiv.innerHTML = noteListContent;
	return noteListDiv;
};

export const noteItemWidget = (isChecked, index, idString) => {
	console.log("idString: ", idString);
	const noteItem = document.createElement("div");
	noteItem.classList.add(
		"note-bodyInput",
		"note-Item",
		"flex",
		"negative-left",
		"align-center",
		"gap3"
	);
	let childElement = `
                <button class="item-checkbox noteApp-btns NoteCheckbox-btn">
                    <img class="checkbox-icon" src="static/icons/noteApp-icons/${
						isChecked ? "checkbox filled" : "checkbox"
					}.svg" alt=""/>
                </button>


                <input id="${
					isChecked ? `${idString}` : `noteList-item${index}`
				}" class="note-Input ${
		isChecked ? "checked" : ""
	} grow" type="text" name="note" placeholder="Take a note..."/>


                <button class="close-noteItem noteApp-btns flex align-center justify-center"><img class="close-icon" src="static/icons/noteApp-icons/close filled.svg" alt=""/></button>
                `;

	noteItem.innerHTML = childElement;
	return noteItem;
};

export const loadNote = (noteMap) => {
	var isAddNote = wichType === "new note" ? true : false;
	const noteListDiv = document.createElement("div");
	noteListDiv.classList.add("noteList-div mynote-Item");

	let noteListContent = `
            <div id="noteList-form" class="noteList-form">
                <div class="note-titleInput flex">
                    <input value="${
						noteMap.title
					}" id="noteList-title" class="grow" type="text" name="title" placeholder="title"/>
                    <div class="noteControl-Btns flex">
                        <button class="mynote-menu noteApp-btns"><img src="static/icons/noteApp-icons/more.svg" alt=""/></button>
                        <button class="mynote-pin-note noteApp-btns"><img src="static/icons/noteApp-icons/pin.svg" alt=""/></button>
                    </div>
                </div>
                ${
					isAddNote
						? `<div class="note-bodyInput">
                                <input  id="noteList-body" autofocus type="text" name="title" placeholder="Take a note..."/>
                            </div>`
						: `<div class="note-bodyInput flex gap3">
                                <button class="noteApp-btns"><img src="static/icons/noteApp-icons/" alt=""/></button>
                                <input id="noteList-body" type="text" name="title" autofocus placeholder="Take a note..."/>
                            </div>`
				}
                
                <div class="flex align-center justify-end"><button id="add-note-list"  class="add-noteList">Done</button></div>
            </div>
    `;

	noteListDiv.innerHTML = noteListContent;
	return noteListDiv;
};
