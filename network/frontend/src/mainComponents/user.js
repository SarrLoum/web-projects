import "./user.css";

export const User = ({ user }) => {
	return (
		<div className="User">
			<Avatar user={user} />
			<UserName1 user={user} />
		</div>
	);
};

export const Avatar = ({ user }) => {
	return (
		<a href="#" className="avatar-container">
			<img
				className="avatar-img"
				src={`http://localhost:8000/${user && user.profile?.avatar}`}
				alt="User avatar"
			/>
		</a>
	);
};

export const UserName1 = ({ user }) => {
	return (
		<a href="#" className="username1">
			<h2 className="pseudo-name">{user && user.profile?.pseudo_name}</h2>
			<span className="user-name">@{user && user.username}</span>
		</a>
	);
};

export const UserName2 = ({ user, chatboxId }) => {
	return (
		<a href="#" id={chatboxId} className="username2">
			<span id={chatboxId} className="pseudo-name">
				{user && user.profile?.pseudo_name}
			</span>
			<span id={chatboxId} className="user-name">
				@{user && user.username}
			</span>
		</a>
	);
};

export const ProfileCover = ({ user }) => {
	return (
		<div className="user-cover">
			<img src={user.cover_img} alt="" />
		</div>
	);
};
export const UserStats = ({ user, userTweets }) => {
	return (
		<div className="user-stats">
			<h4>{user.username}</h4>
			<span>{userTweets}</span>
		</div>
	);
};

export const BiosInfo = ({ Icon, info }) => {
	return (
		<div className="info">
			<Icon />
			<span>{info}</span>
		</div>
	);
};

export const FollowStats = ({ stat, name }) => {
	return (
		<div className="follow-stats">
			<span className="value">{stat}</span>
			<span className="name">{name}</span>
		</div>
	);
};
