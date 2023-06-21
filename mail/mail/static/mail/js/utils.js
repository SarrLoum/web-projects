export const emailElement = (email) => {
	// Change background color if the email is read
	let color = email.read ? "#F2F5FC" : "#fff";

	// Format timestamp
	let dateTime = timesTamp(email.timestamp);
	//format the subject
	let senderName = getUserName(email.sender.email);

	let element = `<li class="email-list-item"><div id="email-details">
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
	return element;
};

export const viewEmail = (email) => {
	// Email sender's name
	let sender = email.sender;
	let senderName = getUserName(sender.email);

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
                <img src="${sender.avatar}" alt="" />
            </div>
        </div>
        <div class="body-container grow">
            <div class="email-header">
            <table>
                <tr class="first-row flex">
                    <td class="first-column">
                        <span class="sender-span1">${senderName}</span>
                        <span class="sender-span2">&lt;${sender.email}&gt;</span>
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
            <div id="respond"></div>
            <div class="rf-btn-container flex">
                <a class="rf-btn" href="#" id="response-email">
                        <img src="static/icons/response.svg" alt="" >
                        <span>Reply</span>
                </a>
                <a class="rf-btn" href="#" id="forward-email">
                    <img src="static/icons/forward.svg" alt="" >
                    <span>Forward</span>
                </a>
            </div>
        </div>
    </div>`;

	return displayEmail;
};

export const userLog = () => {
	let currentUser;
	fetch("/user")
		.then((response) => response.json())
		.then((user) => {
			console.log("currentUser", user);
			currentUser = user;

			console.log("Username:", currentUser?.username);
			const logContainer = document.createElement("div");
			logContainer.className = "userlog-modal";

			let childElement = `
                            <div class="userlog-card">
                                <div class="currentUser">
                                    <div class="user-avatar">
                                        <div class="avatar">
                                            <img src=${
												currentUser?.avatar
											} alt="">
                                        </div>
                                        <div class="change-avatar">
                                            <img src="static/icons/manage-user.svg" alt="">
                                        </div>
                                    </div>
                                    <div class="manage-user">
                                        <div class="username">
                                            <h6>${getUserName(
												currentUser.email
											)}</h6>
                                            <span>${currentUser?.email}</span>
                                        </div>
                                        <div class="account-manage">
                                            <span>Manage your Google Account</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a href="#" class="add-account">
                                <img src="static/icons/user-add.svg" alt="">
                                <span>Add another account </span>
                            </a>
                            <a id="logout" href="#" class="logout-user">
                                <img src="static/icons/logout.svg" alt="">
                                <span>Log out</span>
                            </a>
                            <hr />
                            <div class="terms-conditions flex">
                                <a href="#">Privacy Policy</a>
                                <a href="#">Terms of Services</a>
                            </div>`;

			logContainer.innerHTML = childElement;
			document.body.appendChild(logContainer);
		});
};

export const respondOnEmail = (email) => {
	// Email sender's name
	let sender = email.sender;
	let senderName = getUserName(sender.email);
	let subject = subjectRe(email);

	const respondModal = document.createElement("div");
	respondModal.classList.add("respond-modal");

	let respondElement = `
                <div class="sender-avatar">
                    <div class="avatar-container">
                        <img src="${sender.avatar}" alt="" />
                    </div>
                </div>
                <div class="respond-container" ">
                    <form id="compose-form">
                        <input
                            hidden
                            value="{{ request.user.email }}"
                        />
                        <input
                            hidden
                            value="${subject}"
                        />

                        <div class="respond-header flex">
                        
                            <a class="respond-type" href="#">
                                <img src="static/icons/reponse.svg" alt="" />
                                <img src="static/icons/arrow-down.svg" alt="" />
                            </div>

                            <div class="compose-input grow">
                                <input
                                    id="compose-recipients"
                                    placeholder="${senderName}"
                                    value="${sender.email}"
                                />
                            </div>

                            <div class="scale-respond">
                                <img src="static/icons/reponse.svg" alt="" />
                            </div>
                        </div>
                        <hr />
                        <hr />

                        <div class="compose-textarea">
                            <textarea
                                id="compose-body"
                                placeholder="Body"
                            ></textarea>
                            <div class="text-editor" id="toolbar">
                            </div>
                        </div>

                        <div class="compose-submit">
                            <div class="send-btn">
                                <input type="submit" value="Send" />
                            </div>
                        </div>
                    </form>

                </div>
                        `;

	return respondElement;
};

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