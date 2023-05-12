import { User } from "../mainComponents/user";
import { useState } from "react";
import { UserLogsModal } from "../theModals/modalLogIn";

import "./sidebarElements.css";
import { More2 } from "../widgets/myIcons";

export const Nav = ({ handleButtonClick, Icon, text }) => {
	return (
		<div onClick={handleButtonClick} className="nav-option">
			<Icon />
			<span className="text">{text}</span>
		</div>
	);
};

export const TweetButton = () => {
	return (
		<div className="tweet-btn">
			<p>Tweet</p>
		</div>
	);
};

export const UserLog = ({ user, Icon, getUser }) => {
	const [logsModal, setLogsModal] = useState(null);

	//function that sets logsModal state
	function openUserLog() {
		setLogsModal("openLogsModal");
	}

	// function that closed the user accounts log modal
	function closeUserLog() {
		setLogsModal(null);
	}

	// function that renders the user accounts log modal when its state variable is set
	function renderLogsModal() {
		if (logsModal === "openLogsModal") {
			return <UserLogsModal onClose={closeUserLog} getUser={getUser} />;
		} else {
			return null;
		}
	}
	return (
		<div onClick={openUserLog} className="user-log">
			<User user={user} />
			<More2 />
			{
				// calling the renderLogsModal function
				renderLogsModal()
			}
		</div>
	);
};
