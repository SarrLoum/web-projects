import { Avatar, UserName2 } from "./user";
import { MetricButtons } from "./myButtons";

import "./posType.css";

export const Repost = ({ repost }) => {
	return (
		<div className='repost'>
			<span>Reposted by {repost.user}</span>
			{repost.post != null && <Post post={repost.post} />}
			{repost.quote != null && <Quote quote={repost.quote} />}
			{repost.reply != null && <Reply reply={repost.reply} />}
		</div>
	);
};

export const Reply = ({ reply }) => {
	return (
		<div className='reply'>
			<BasePost user={reply.user} post={reply} />
			<MetricButtons />
		</div>
	);
};

export const Quote = ({ quote }) => {
	return (
		<div className='quote'>
			<BasePost user={quote.user} post={quote} />

			{quote.post != null && (
				<div className='post-content'>
					<BasePost user={quote.post.user} post={quote.post} />
				</div>
			)}
			{quote.parent_quote != null && (
				<div className='post-content'>
					<BasePost user={quote.post.user} post={quote.parent_quote} />
				</div>
			)}
			{quote.reply != null && (
				<div className='post-content'>
					<BasePost user={quote.post.user} post={quote.post} />
				</div>
			)}
			<MetricButtons />
		</div>
	);
};

export const Post = ({ post }) => {
	return (
		<div className='post'>
			<BasePost post={post} />
			<MetricButtons />
		</div>
	);
};

export const BasePost = ({ user, post }) => {
	const userProfile = user.profile;
	return (
		<>
			<Avatar avatar={userProfile.avatar} />
			<div className='post-content'>
				<UserName2 username={user.username} pseudo={userProfile.pseudo_name} />
				<p>{post.text}</p>
				{post.media != null && <div className='media-area'>{post.media}</div>}
			</div>
		</>
	);
};
