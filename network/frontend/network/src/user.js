import "./user.css";

export const User = ({ user, userProfile }) => {
	return (
		<div>
			<Avatar userProfile={userProfile} />
			<UserName1 user={user} userProfile={userProfile} />
		</div>
	);
};

export const Avatar = ({ userProfile }) => (
	<img src={userProfile.avatar} alt='User avatar' />
);

export const UserName1 = ({ user, userProfile }) => {
	return (
		<div className='username1'>
			<span className='pseudo-name'>{userProfile.pseudo_name}</span>
			<span className='user-name'>{user.username}</span>
		</div>
	);
};

export const UseName2 = ({ user, userProfile }) => {
	return (
		<div className='username2'>
			<span className='pseudo-name'>{userProfile.pseudo_name}</span>
			<span className='user-name'>{user.username}</span>
		</div>
	);
};
