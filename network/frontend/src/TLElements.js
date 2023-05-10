import { useState } from "react";
import { Avatar, UserName2 } from "./user";
import { Reply, Repost, Quote, Post, BasePost } from "./posType";
import { MediaButtons } from "./myButtons";

import "./TLElements.css";

export const Status = ({ userProfile }) => {
	return (
		<div className="status-container">
			<div className="user-status">
				<Avatar userProfile={userProfile} />
			</div>
			<div className="form-container">
				<form action="">
					<TextInput />
					<div className="selected-files"></div>
					<div className="status-btn">
						<MediaButtons />
						<input type="submit" value="Tweet" />
					</div>
				</form>
			</div>
		</div>
	);
};

export const Fleet = ({ userProfile }) => {
	return (
		<div className="fleet">
			<Avatar userProfile={userProfile} />
		</div>
	);
};

export const Feed = () => {
	const [userTL, setUserTL] = useState(null);

	fetch("/feed", {
		method: "Get",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			setUserTL(data);
		});

	function renderTL() {
		const { user, posts, replies, quotes, reposts } = userTL;

		const allPosts = posts.concat(replies, quotes, reposts);

		for (let i = allPosts.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
		}

		return (
			<>
				{allPosts &&
					allPosts.map((singlePost) => {
						if (singlePost.is_post === true) {
							return <Post post={singlePost} />;
						} else if (singlePost.is_reply === true) {
							return <Reply reply={singlePost} />;
						} else if (singlePost.is_quote === true) {
							return <Quote quote={singlePost} />;
						} else if (singlePost.is_repost === true) {
							return <Repost repost={singlePost} />;
						}
						return null;
					})}
			</>
		);
	}
	return renderTL();
};

export const Quoting = ({ user, post }) => {
	return (
		<div className="quote-container">
			<div className="user-status">
				<Avatar userProfile={user} />
			</div>
			<div className="form-container">
				<form action="">
					<TextInput />
					<div className="selected-files"></div>
					<QuotedPost user={user} post={post} />
					<div className="status-btn">
						<MediaButtons />
						<input type="submit" value="Tweet" />
					</div>
				</form>
			</div>
		</div>
	);
};

export const TextInput = () => {
	const [value, setValue] = useState("");
	const [height, setHeight] = useState("auto");

	function handleInputChange(event) {
		setValue(event.target.value);
		setHeight(event.target.scrollHeight + "px");
	}
	return (
		<>
			<textarea
				type="textarea"
				name="text"
				id="text-input"
				placeholder="What's hapenning?"
				maxLength="300"
				value={value}
				onChange={handleInputChange}
				style={{ height }}
			></textarea>
		</>
	);
};

export const QuotedPost = ({ user, post }) => {
	return (
		<div className="quoted-post">
			<Avatar user={user} />
			<div className="container">
				<div className="post-content">
					<UserName2 user={user} />
					<p>{post.text}</p>
					{post.media != null && (
						<div className="media-area">{post.media}</div>
					)}
				</div>
			</div>
		</div>
	);
};
