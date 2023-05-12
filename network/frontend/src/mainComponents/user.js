import "./user.css";

export const User = ({ user }) => {
	return (
		<div className="User">
			<Avatar User={user} />
			<UserName1 user={user} />
		</div>
	);
};

export const Avatar = ({ user }) => (
	<div className="avatar-container">
		<img
			className="avatar-img"
			src={`http://localhost:8000/${user.profile?.avatar}`}
			alt="User avatar"
		/>
	</div>
);

export const UserName1 = ({ user }) => {
	return (
		<div className="username1">
			<span className="pseudo-name">{user.profile?.pseudo_name}</span>
			<span className="user-name">@{user.username}</span>
		</div>
	);
};

export const UserName2 = ({ user }) => {
	return (
		<div className="username2">
			<span className="pseudo-name">{user.profile?.pseudo_name}</span>
			<span className="user-name">@{user.username}</span>
		</div>
	);
};
