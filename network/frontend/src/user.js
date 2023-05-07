import "./user.css";

export const User = ({ handleLog, user, userProfile }) => {
	return (
		<div onClick={handleLog} className='User'>
			<Avatar userProfile={userProfile} />
			<UserName1 user={user} userProfile={userProfile} />
		</div>
	);
};

export const Avatar = ({ userProfile }) => (
	<div className='avatar-container'>
		<img className='avatar-img' src={userProfile.avatarUrl} alt='User avatar' />
	</div>
);

export const UserName1 = ({ user, userProfile }) => {
	return (
		<div className='username1'>
			<span className='pseudo-name'>{userProfile.pseudo_name}</span>
			<span className='user-name'>@{user.username}</span>
		</div>
	);
};

export const UserName2 = ({ user, userProfile }) => {
	return (
		<div className='username2'>
			<span className='pseudo-name'>{userProfile.pseudo_name}</span>
			<span className='user-name'>@{user.username}</span>
		</div>
	);
};
