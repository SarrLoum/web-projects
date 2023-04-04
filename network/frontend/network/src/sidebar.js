import { Nav, TweetButton, UserLog } from "./sidebarElements";
import {
	Cube,
	Home,
	HashExplore,
	Notification,
	PaperPlane,
	Bookmark,
	List,
	Person,
	More,
	More2,
} from "./myIcons";
import "./sidebar.css";

const Sidebar = () => {
	const user = {
		id: 1,
		username: "SarrLoum",
		email: "sarrloum10@gmail.com",
	};

	const userProfile = {
		user: 1,
		avatarUrl: "./Braided.jpg",
		pseudo_name: "SpaceWalker",
	};

	return (
		<div className='sidebar-container'>
			<Cube />
			<div className='nav-container'>
				<Nav Icon={Home} text='Home' />
				<Nav Icon={HashExplore} text='Explore' />
				<Nav Icon={Notification} text='Notification' />
				<Nav Icon={PaperPlane} text='Message' />
				<Nav Icon={Bookmark} text='Bookmark' />
				<Nav Icon={List} text='List' />
				<Nav Icon={Person} text='Profile' />
				<Nav Icon={More} text='More' />
			</div>
			<TweetButton />
			<UserLog user={user} userProfile={userProfile} Icon={More2} />
		</div>
	);
};

export default Sidebar;
