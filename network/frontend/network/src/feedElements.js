import "./feddElements.css";
import { Avatar, UserName2 } from "./user";

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
		<div className='fleet'>
			<Avatar avatar={userProfile.avatar} />
		</div>
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
			{post != null && <BasePost />}
			{quote != null && <Quote />}
			{reply != null && <Reply />}
		</div>
	);
};

export const Reply = () => {
	return (
		<div className='reply'>
			<BasePost />
		</div>
	);
};

export const Quote = (post, quote, reply) => {
	return (
		<div className='quote'>
			<BasePost user={user} userProfile={user.profile} />
			<div className='post-content'></div>
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
            <MetricButtons />
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
