export const chatboxRecipient = (chatbox, currentUser) => {
	let recipient;
	if (currentUser.username === chatbox.user1.username) {
		recipient = chatbox.user2;
	} else {
		recipient = chatbox.user1;
	}

	return recipient;
};

export const getPostType = (post) => {
	if (post.is_post) {
		return "post";
	} else if (post.is_reply) {
		return "reply";
	} else if (post.is_repost) {
		return "quote";
	} else {
		return "repost";
	}
};

export const formatLatestChat = (latestChat, currentUser, chatboxId) => {
	let message1, message2;
	if (currentUser.username === latestChat.sender.username) {
		message1 = (
			<>
				<p id={chatboxId}>You sent a media</p>
			</>
		);
		message2 = (
			<>
				<p id={chatboxId}>You: {latestChat.text}</p>
			</>
		);
	} else {
		message1 = (
			<>
				<p id={chatboxId}>Sent a media</p>
			</>
		);
		message2 = (
			<>
				<p id={chatboxId}>{latestChat.text}</p>
			</>
		);
	}

	return {
		text1: message1,
		text2: message2,
	};
};

function isCurrentUser(sender, currentUser) {
	if (currentUser.username === sender.username) {
		return true;
	} else {
		return false;
	}
}

export const renderChat = (chat, currentUser) => {
	const sender = chat.sender;
	console.log("chat sender (from renderchat):", sender);
	console.log("currentUser (from renderchat):", currentUser);

	let textMessage = (
		<>
			<div
				className={`chat-text ${
					isCurrentUser(sender, currentUser) ? "right" : "left"
				}`}
			>
				<span>{chat.text}</span>
			</div>
		</>
	);

	let mediaMessage = (
		<>
			<div
				className={`chat-media ${
					isCurrentUser(sender, currentUser) ? "right" : "left"
				}`}
			>
				<img src={chat.media} alt="" />
			</div>
		</>
	);

	if (chat.text) {
		return (
			<li
				className={`chat-list ${
					isCurrentUser(sender, currentUser)
						? "justify-right"
						: "justify-left"
				}`}
			>
				{textMessage}
			</li>
		);
	} else {
		return (
			<li
				className={`chat-list ${
					isCurrentUser(sender, currentUser)
						? "justify-right"
						: "justify-left"
				}`}
			>
				{mediaMessage}{" "}
			</li>
		);
	}
};
