import { User } from "./user";
import "./sidebarElements.css";

export const Nav = ({ Icon, text }) => {
	return (
		<div className='nav-option'>
			<Icon />
			<span>{text}</span>
		</div>
	);
};

export const TweetButton = () => {
	return (
		<div className='tweet-btn'>
			<p>Tweet</p>
		</div>
	);
};

export const UserLog = ({ user, userProfile, Icon }) => {
	return (
		<div className='user-log'>
			<User user={user} profile={userProfile} />
			<Icon />
		</div>
	);
};
