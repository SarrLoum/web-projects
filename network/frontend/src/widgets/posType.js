import { Avatar, UserName2 } from "../mainComponents/user";
import { Metrics } from "./metrics";

import "./posType.css";

export const Repost = ({ repost, currentUser }) => {
	return (
		<div className="repost">
			<span>Reposted by {repost.user}</span>
			{repost.post != null && (
				<Post post={repost.post} currentUser={currentUser} />
			)}
			{repost.quote != null && (
				<Quote quote={repost.quote} currentUser={currentUser} />
			)}
			{repost.reply != null && (
				<Reply reply={repost.reply} currentUser={currentUser} />
			)}
		</div>
	);
};

export const Reply = ({ reply, currentUser }) => {
	return (
		<div className="reply">
			<BasePost
				user={reply.user}
				post={reply}
				currentUser={currentUser}
			/>
		</div>
	);
};

export const Quote = ({ quote, currentUser }) => {
	return (
		<div className="quote">
			<BasePost
				user={quote.user}
				post={quote}
				currentUser={currentUser}
			/>

			{quote.post != null && (
				<div className="post-content">
					<BasePost
						user={quote.post.user}
						post={quote.post}
						currentUser={currentUser}
					/>
				</div>
			)}
			{quote.parent_quote != null && (
				<div className="post-content">
					<BasePost
						user={quote.post.user}
						post={quote.parent_quote}
						currentUser={currentUser}
					/>
				</div>
			)}
			{quote.reply != null && (
				<div className="post-content">
					<BasePost
						user={quote.post.user}
						post={quote.post}
						currentUser={currentUser}
					/>
				</div>
			)}
		</div>
	);
};

export const Post = ({ post, currentUser }) => {
	return (
		<div className="post">
			<BasePost user={post.user} post={post} currentUser={currentUser} />
		</div>
	);
};

export const BasePost = ({ user, post, currentUser }) => {
	return (
		<>
			<Avatar user={user} />
			<div className="container">
				<div className="post-content">
					<UserName2 user={user} />
					<p>{post.text}</p>
					{post.media != null && (
						<>
							<div className="media-area">
								<img src={post.media} alt="" />
							</div>
						</>
					)}
				</div>
				<Metrics user={user} post={post} currentUser={currentUser} />
			</div>
		</>
	);
};
