import { Avatar, UserName2 } from "../mainComponents/user";
import { Metrics } from "./metrics";

import "./posType.css";

export const Repost = ({ repost }) => {
	return (
		<div className="repost">
			<span>Reposted by {repost.user}</span>
			{repost.post != null && <Post post={repost.post} />}
			{repost.quote != null && <Quote quote={repost.quote} />}
			{repost.reply != null && <Reply reply={repost.reply} />}
		</div>
	);
};

export const Reply = ({ reply }) => {
	return (
		<div className="reply">
			<BasePost user={reply.user} post={reply} />
		</div>
	);
};

export const Quote = ({ quote }) => {
	return (
		<div className="quote">
			<BasePost user={quote.user} post={quote} />

			{quote.post != null && (
				<div className="post-content">
					<BasePost user={quote.post.user} post={quote.post} />
				</div>
			)}
			{quote.parent_quote != null && (
				<div className="post-content">
					<BasePost
						user={quote.post.user}
						post={quote.parent_quote}
					/>
				</div>
			)}
			{quote.reply != null && (
				<div className="post-content">
					<BasePost user={quote.post.user} post={quote.post} />
				</div>
			)}
		</div>
	);
};

export const Post = ({ post }) => {
	return (
		<div className="post">
			<BasePost user={post.user} post={post} />
		</div>
	);
};

export const BasePost = ({ user, post }) => {
	return (
		<>
			<Avatar user={user} />
			<div className="container">
				<div className="post-content">
					<UserName2 user={user} />
					<p>{post.text}</p>
					{post.media != null && (
						<div className="media-area">{post.media}</div>
					)}
				</div>
				<Metrics user={user} post={post} />
			</div>
		</>
	);
};
