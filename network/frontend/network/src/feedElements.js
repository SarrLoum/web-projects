import { Avatar, UserName2 } from "./user";
import "./feddElements.css";


export const Status = () => {
	return (
		<div>
			<Avatar avatar={userProfile.avatar} />
			<div className='form-container'>
				<form action=''>
					<input type='textarea' />
					...
				</form>
			</div>
		</div>
	);
};

export const Fleet = () => {
	return (
		<>
			<div className='fleet'>
				<Avatar avatar={userProfile.avatar} />
			</div>
		</>
	);
};

export const Feed = () => {
	return <div></div>;
};

export const Repost = ({ user, post, quote, reply }) => {
	return (
		<div className='repost'>
			<div>
				<RepostIcon />
				<span></span>
			</div>
			{post != null && <Post />}
			{quote != null && <Quote />}
			{reply != null && <Reply />}
		</div>
	);
};

export const Reply = ({ reply, parrent_reply, quote, post }) => {
	return (
		<div className='reply'>
			<BasePost />
			<MetricButtons />
		</div>
	);
};

export const Quote = (post, quote, parent_quote, reply) => {
	return (
		<div className='quote'>
			<BasePost
				user={quote.user}
				userProfile={quote.user.profile}
				post={quote}
			/>
			{post != null && <div className='post-content'></div>}
			{parent_quote != null && <div className='post-content'></div>}
			{reply != null && <div className='post-content'></div>}
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

export const BasePost = ({ user, userProfile, post }) => {
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

export const MetricButtons = ({ quote, post, reply }) => {
	return (
		<div className='metric-btn'>
			<Comment />
			<Repost />
			<Like />
			<Stats />
			<Shares />
		</div>
	);
};
