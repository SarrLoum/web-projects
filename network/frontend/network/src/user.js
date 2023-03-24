import "./user.css";

export const User = ({ user, userProfile }) => {
	return (
		<div>
			<Avatar avatar={userProfile.avatar} />
			<UserName1 username={user.username} pseudo={userProfile.pseudo_name} />
		</div>
	);
};

export const Avatar = ({ avatar }) => (
	<img src={avatar} alt='User avatar' srcset='' />
);

export const UseName1 = ({ username, pseudo }) => {
	return (
		<div className='username1'>
			<span className='pseudo-name'>{pseudo}</span>
			<span className='user-name'>{username}</span>
		</div>
	);
};

export const UseName2 = ({ username, pseudo }) => {
	return (
		<div className='username2'>
			<span className='pseudo-name'>{pseudo}</span>
			<span className='user-name'>{username}</span>
		</div>
	);
};
