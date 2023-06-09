import { useState } from "react";
import { Nav, TweetButton, UserLog } from "../subComponents/sidebarElements";
import {
	Cube,
	Home,
	HashExplore,
	Notification,
	PaperPlane,
	Params2,
	Bookmark,
	List,
	Person,
	More,
	More2,
} from "../widgets/myIcons";
import "./sidebar.css";

const Sidebar = ({ handleButton, UserAuth, getUser, currentUser }) => {
	return (
		<div className="sidebar-container">
			<Cube />
			{UserAuth ? (
				<>
					<div className="nav-container">
						<Nav
							handleButtonClick={handleButton}
							Icon={Home}
							text="Home"
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={HashExplore}
							text="Explore"
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={Notification}
							text="Notification"
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={PaperPlane}
							text="Message"
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={Bookmark}
							text="Bookmark"
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={List}
							text="List"
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={Person}
							text="Profile"
						/>
						<Nav
							handleButtonClick={handleButton}
							Icon={More}
							text="More"
						/>
					</div>
					<TweetButton />
					<UserLog getUser={getUser} user={currentUser} />
				</>
			) : (
				<div className="nav-container">
					<Nav Icon={HashExplore} text="Explore" />
					<Nav Icon={Params2} text="List" />
				</div>
			)}
		</div>
	);
};

export default Sidebar;
