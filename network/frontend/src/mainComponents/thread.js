import { useState, useEffect } from "react";
import { getThread } from "../apiServices";
import { getPostType } from "../mainComponents/utils";

import { Metrics, StatLinks } from "../widgets/metrics";
import { Backword } from "../widgets/myIcons";
import { ReplyToPost } from "../subComponents/TLElements";
import { Reply } from "./widgets/postType";
import { User } from "./user";

import "./thread.css";

const Thread = ({ currentUser, post }) => {
	const paramsValue = getPostType(post);
	const [postReplies, setPostReplies] = useState(null);

	useEffect(() => {
		try {
			const replies = getThread(post.id, paramsValue);
			setPostReplies(replies);
		} catch (error) {
			console.error("Error fetching post replies:", error);
		}
	}, []);

	function renderReplies() {
		return postReplies.map((reply) => {
			return <Reply currentUser={currentUser} post={reply} />;
		});
	}
	return (
		<div className="thread-container">
			<div className="thread-header">
				<a href="#">
					<Backword />
				</a>
				<h4>Tweet</h4>
			</div>
			<div className="basepost-wrapper">
				<div className="basepost-container">
					<User user={currentUser} />
					<p>{post.text}</p>
					<a href="#">Translate Tweet</a>
					<div className="timestamp">
						<span>time</span>
						<span>date</span>
						<span>views</span>
					</div>
				</div>
				<hr />
				<StatLinks post={post} />
				<hr />
				<Metrics cuurentUser={currentUser} isThread={true} />
				<hr />
				<ReplyToPost user={currentUser} post={post} />
			</div>
			<div className="replies-container">{renderReplies()}</div>
		</div>
	);
};

export default Thread;
