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
import { useEffect, useState } from "react";
import { Nav, TweetButton, UserLog } from "./sidebarElements";
import { LogOut } from "./modalLogIn";
import Braided from "./icons/Braided.JPG";
import "./sidebar.css";

const Sidebar = ({ handleButton, UserAuth, getUser }) => {
	const [logOut, setLogOut] = useState(null);

	function openUserLog() {
		setLogOut("logout");
	}

	function closeUserLog() {
		setLogOut(null);
	}

	function otherAccount() {
		if (logOut === "logout") {
			return <LogOut onClose={closeUserLog} currentUser={getUser} />;
		} else {
			return null;
		}
	}

	const user = {
		id: 1,
		username: "SarrLoum",
		email: "sarrloum10@gmail.com",
	};

	const userProfile = {
		user: 1,
		avatarUrl: Braided,
		pseudo_name: "SpaceWalker",
	};

	return (
		<div className='sidebar-container'>
			<Cube />
			{UserAuth ? (
				<>
					<div className='nav-container'>
						<Nav handleButtonClick={handleButton} Icon={Home} text='Home' />
						<Nav
							handleButtonClick={handleButton}
							Icon={HashExplore}
							text='Explore'
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={Notification}
							text='Notification'
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={PaperPlane}
							text='Message'
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={Bookmark}
							text='Bookmark'
						/>
						<Nav handleButtonClick={handleButton} Icon={List} text='List' />
						<Nav
							handleButtonClick={handleButton}
							Icon={Person}
							text='Profile'
						/>
						<Nav handleButtonClick={handleButton} Icon={More} text='More' />
					</div>
					<TweetButton />
					<UserLog
						handleLog={openUserLog}
						user={user}
						userProfile={userProfile}
						Icon={More2}
					/>
				</>
			) : (
				<div className='nav-container'>
					<Nav Icon={HashExplore} text='Explore' />
					<Nav Icon={List} text='List' />
				</div>
			)}
		</div>
	);
};

export default Sidebar;
