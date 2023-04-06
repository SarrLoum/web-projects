import { Avatar, UserName2 } from "./user";
import "./feedElements.css";

export const Status = ({ userProfile }) => {
	return (
		<div className='status-container'>
			<div className='user-status'>
				<Avatar avatar={userProfile.avatar} />
			</div>
			<div className='form-container'>
				<form action=''>
					<input
						type='textarea'
						name='text'
						id='text-input'
						placeholder="What's hapenning?"
					/>
					<div class='selected-files'></div>
					<div className='media-inputs'>
						<label for='media-input'>
							<img src={userProfile} alt='Select a file'></img>
							<input
								type='file'
								name='media'
								id='media-input'
								accept='image/*,video/*,image/gif'
								multiple
							></input>
						</label>
						<label>
							<img src={userProfile} alt='Select a file'></img>
							<input
								type='file'
								name='media'
								id='media-input'
								accept='image/*,video/*,image/gif'
								multiple
							></input>
						</label>
						<button for='text'>
							<img src={userProfile} alt='Add an emoji'></img>
						</button>
					</div>
					...
				</form>
			</div>
		</div>
	);
};

export const Fleet = ({ userProfile }) => {
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
			<span>Reposted by</span>
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
	return <div className='metric-btn'>Comment Repost Like Stats Shares</div>;
};
