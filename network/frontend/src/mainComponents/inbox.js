import React, { useEffect, useState } from "react";
import { InboxWrapper, ChatBox } from "../subComponents/inboxElements";

import "./inbox.css";

export const Inbox = ({ currentUser }) => {
	const [chatBoxes, setChatBoxes] = useState(null);
	const accessToken = localStorage.getItem("accessToken");

	const [showChatbox, SetShowChatbox] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [primaryKey, setPrimaryKey] = useState(null);
	const [interlocutor, setInterlocutor] = useState(null);

	useEffect(() => {
		fetch("http://localhost:8000/api/inbox", {
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then((response) => response.json())
			.then((data) => {
				setChatBoxes(data);
			});
	}, [accessToken]);

	function handleChatbox(e) {
		//e.preventDefault();
		const key = e.target.id;
		SetShowChatbox(true);
		setPrimaryKey(key);
	}

	function handleChatboxChange() {
		SetShowChatbox(false);
	}

	function getInterlocutor(recipient) {
		setInterlocutor(recipient);
	}
	function openInbox() {
		setIsOpen(!isOpen);

		const bottomValue = -28 + "em";
		const inbox = document.querySelector("#inbox");
		if (isOpen === true) {
			inbox.style.bottom = bottomValue;
		} else {
			inbox.style.bottom = 0;
		}
	}

	return (
		<div className="Inbox-container" id="inbox">
			{!showChatbox ? (
				<InboxWrapper
					isOpen={isOpen}
					chatBoxes={chatBoxes}
					currentUser={currentUser}
					handleChatbox={handleChatbox}
					getRecipient={getInterlocutor}
					handleInbox={openInbox}
				/>
			) : (
				<ChatBox
					pk={primaryKey}
					isOpen={isOpen}
					user2={interlocutor}
					currentUser={currentUser}
					showPreview={handleChatboxChange}
					handleInbox={openInbox}
				/>
			)}
		</div>
	);
};
