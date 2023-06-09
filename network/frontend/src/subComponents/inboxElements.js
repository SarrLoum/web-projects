import { Avatar, UserName1, UserName2 } from "../mainComponents/user";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
	chatboxRecipient,
	formatLatestChat,
	renderChat,
} from "../mainComponents/utils";

import {
	InboxAdd,
	ArrowDown,
	ArrowUp,
	InboxRequest,
	Backword,
} from "../widgets//myIcons";

import "./inboxElements.css";

export const InboxWrapper = ({
	isOpen,
	chatBoxes,
	currentUser,
	handleChatbox,
	getRecipient,
	handleInbox,
}) => {
	let chatboxes = [];
	if (chatBoxes) {
		({ chatboxes = [] } = chatBoxes);
	}

	function renderChatboxes() {
		return (
			<>
				{chatboxes.map((chatbox) => {
					const latestChat = chatbox.latest_chat;
					const chatboxId = chatbox.id;

					const recipient = chatboxRecipient(chatbox, currentUser);
					const message = formatLatestChat(
						latestChat,
						currentUser,
						chatboxId
					);

					return (
						<>
							<a href="#">
								<li
									id={chatboxId}
									onClick={(e) => {
										handleChatbox(e);
										getRecipient(recipient);
									}}
									className="message-list inbox-padding flex"
								>
									<div id={chatboxId} className="sender">
										<Avatar user={recipient} />
									</div>
									<div
										id={chatboxId}
										className="message-preview"
									>
										<UserName2
											chatboxId={chatboxId}
											user={recipient}
										/>
										{latestChat.media
											? message.text1
											: message.text2}
									</div>
								</li>
							</a>
						</>
					);
				})}
			</>
		);
	}

	return (
		<div className="inbox-wrapper">
			<a onClick={handleInbox} href="#">
				<div className="inbox-header flex justify">
					<a href="#">
						<h6>Messages</h6>
					</a>
					<div className="flex justify">
						<a className="icon-link" href="#">
							<InboxAdd />
						</a>
						<a onClick={handleInbox} className="icon-link" href="#">
							{!isOpen ? <ArrowUp /> : <ArrowDown />}
						</a>
					</div>
				</div>
			</a>

			<a href="#">
				<div className="inbox-request inbox-padding flex">
					<div className="request-icon">
						<InboxRequest />
					</div>
					<div className="request-info">
						<div className="infos">
							<h6>Message Requests</h6>
							<p>2 pending requests</p>
						</div>
					</div>
				</div>
			</a>

			<div className="messages-container">
				<ul>{renderChatboxes()}</ul>
			</div>
		</div>
	);
};

export const ChatBox = ({
	pk,
	isOpen,
	user2,
	currentUser,
	showPreview,
	handleInbox,
}) => {
	const [chatboxChats, setChatboxChats] = useState(null);

	const accessToken = localStorage.getItem("accessToken");
	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/chatbox/${pk}/chats`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			})
			.then((response) => {
				setChatboxChats(response.data);
				console.log("response data:", response.data);
			});
	}, []);

	console.log("chatboxChats:", JSON.stringify(chatboxChats));

	function renderChatbox() {
		if (chatboxChats) {
			return chatboxChats.map((chat) => {
				console.log("rendering chat:", chat);
				console.log("chat message:", chat.text);
				return <>{renderChat(chat, currentUser)}</>;
			});
		}
		return null;
	}
	return (
		<div className="chatbox-wrapper">
			<div className="chatbox-header flex justify">
				<a className="icon-link" href="#">
					<Backword goToPreview={showPreview} />
				</a>

				<UserName1 user={user2} />

				<a onClick={handleInbox} className="icon-link" href="#">
					{!isOpen ? <ArrowUp /> : <ArrowDown />}
				</a>
			</div>
			<div className="chats-container">
				<ul>{renderChatbox()}</ul>
			</div>
		</div>
	);
};
