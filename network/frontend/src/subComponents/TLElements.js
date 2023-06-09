import React, { useEffect, useState } from "react";
import { replyPost, composePost } from "../apiServices";
import { Avatar } from "../mainComponents/user";
import { Reply, Repost, Quote, Post } from "../widgets/posType";
import { TextInput } from "../widgets/modalsWidget";
import { MediaButtons } from "../widgets/myButtons";

import "./TLElements.css";

export const Status = ({ user }) => {
	const [postData, setPostData] = useState({
		text: "",
		media: "",
	});

	function handlePostData(e) {
		const { name, value } = e.target;
		setPostData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	function handlePostCompose() {
		composePost(postData);
	}
	return (
		<div className="status-container flex gap">
			<div className="user-status">
				<Avatar user={user} />
			</div>
			<div className="form-container">
				<form method="POST" onSubmit={handlePostCompose} action="">
					<TextInput handleData={handlePostData} />
					<div className="selected-files"></div>
					<div className="status-btn">
						<MediaButtons handleData={handlePostData} />
						<input type="submit" value="Tweet" />
					</div>
				</form>
			</div>
		</div>
	);
};

export const ReplyToPost = ({ user, post }) => {
	const [isFocus, setIsFocus] = useState(false);
	const [replyData, setReplyData] = useState({
		text: "",
		media: "",
		post: null,
		quote: null,
		parent_reply: null,
	});

	function handleReplyData(e) {
		const { name, value } = e.target;

		setReplyData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	function handleReplyPost() {
		replyPost(post.id, replyData);
	}

	function checkFocus() {
		setIsFocus(true);
	}
	return (
		<div className="reply-post flex">
			<div className="current-user">
				<Avatar user={user} />
			</div>
			<div className="form-container grow">
				{isFocus && (
					<div className="replied-user">
						<span>{`Replying to ${post.user}`} </span>
					</div>
				)}
				<form
					method="POST"
					onSubmit={handleReplyPost}
					className={!isFocus ? "flex" : ""}
				>
					<TextInput
						handleData={handleReplyData}
						handleFocus={checkFocus}
					/>
					{!isFocus ? (
						<>
							<div className="status-btn">
								<input type="submit" value="Tweet" />
							</div>
						</>
					) : (
						<>
							<div className="selected-files"></div>
							<div className="status-btn">
								<MediaButtons
									isReplyF={true}
									handleData={handleReplyData}
								/>
								<input type="submit" value="Tweet" />
							</div>
						</>
					)}
				</form>
			</div>
		</div>
	);
};

export const Feed = ({ currentUser }) => {
	const [userTL, setUserTL] = useState(null);

	const accessToken = localStorage.getItem("accessToken");

	useEffect(() => {
		fetch("http://localhost:8000/api/timeline", {
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setUserTL(data);
			});
	}, [accessToken]);

	function renderTL() {
		let posts = [],
			replies = [],
			quotes = [],
			reposts = [];
		if (userTL) {
			({ posts = [], replies = [], quotes = [], reposts = [] } = userTL);
		}

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
							return (
								<Post
									post={singlePost}
									currentUser={currentUser}
								/>
							);
						} else if (singlePost.is_reply === true) {
							return (
								<Reply
									reply={singlePost}
									currentUser={currentUser}
								/>
							);
						}
						/* else if (singlePost.is_quote === true) {
							return <Quote quote={singlePost} currentUser={currentUser} />;
						} else if (singlePost.is_repost === true) {
							return <Repost repost={singlePost} currentUser={currentUser} />;
						}
						return null;*/
					})}
			</>
		);
	}
	return renderTL();
};
