import apple from "../icons/apple.svg";
import addUser from "../icons/addUser.svg";
import bellNotification from "../icons/bellNotification.svg";
import bookmark from "../icons/bookmark.svg";
import backword from "../icons/backword.svg";

import calendar from "../icons/calendar.svg";
import comments from "../icons/comments.svg";
import close from "../icons/close.svg";
import cube from "../icons/cube.svg";
import cube2 from "../icons/cube2.svg";

import gif from "../icons/gif.svg";
import google from "../icons/google.svg";
import hashExplore from "../icons/hashExplore.svg";
import home from "../icons/home.svg";

import impressions from "../icons/impressions.svg";
import likes from "../icons/likes.svg";
import list from "../icons/list.svg";
import logout from "../icons/logout.svg";
import mapin from "../icons/mapin.svg";
import mediafile from "../icons/mediafile.svg";
import more from "../icons/more.svg";
import more2 from "../icons/more2.svg";

import paperPlane from "../icons/paperPlane.svg";
import parameters from "../icons/parameters.svg";
import person from "../icons/person.svg";
import polls from "../icons/polls.svg";

import quote from "../icons/quote.svg";
import reposts from "../icons/reposts.svg";
import repost2 from "../icons/repost2.svg";
import search from "../icons/search.svg";
import shares from "../icons/shares.svg";
import smiley from "../icons/smiley.svg";

import "./myIcons.css";

// Simple icons
export const Calendar = () => <img src={calendar} alt="Calendar" />;
export const Cube2 = () => <img className="logo" src={cube2} alt="Cube logo" />;

export const Gif = () => <img src={gif} alt="Gif" />;
export const Home = () => <img className="icons" src={home} alt="Home" />;
export const Image = () => <img src={mediafile} alt="media" />;
export const List = () => <img className="icons" src={list} alt="List" />;

export const MapIn = () => <img src={mapin} alt="Map in user" />;
export const More = () => <img className="icons" src={more} alt="More" />;
export const More2 = () => <img src={more2} alt="More icon" />;

export const Person = () => <img className="icons" src={person} alt="User" />;
export const Polls = () => <img src={polls} alt="Polls" />;

export const Smiley = () => <img src={smiley} alt="Smiley" />;
export const Search = () => <img src={search} alt="search" />;

// mid-icons
export const Apple = () => (
	<img className="icons" src={apple} alt="Apple logo" />
);

export const Bookmark = () => (
	<img className="icons" src={bookmark} alt="Bookmark " />
);

export const Cube = () => (
	<img className="cube-logo" src={cube} alt="Cube logo" />
);

export const Google = () => (
	<img className="icons" src={google} alt="Google logo" />
);

export const HashExplore = () => (
	<img className="icons" src={hashExplore} alt="Explorer" />
);

export const Notification = () => (
	<img className="icons" src={bellNotification} alt="Notification" />
);

export const OtherAccount = () => {
	<img src={addUser} alt="Add account" />;
};

export const OutLog = () => {
	<img src={logout} alt="Log-out" />;
};

export const PaperPlane = () => (
	<img className="icons" src={paperPlane} alt="Inbox" />
);
export const Params = () => (
	<img className="icons" src={parameters} alt="Parameters" />
);

// High-level icons
export const Backword = ({ goToPreview }) => (
	<div className="close-btn">
		<img onClick={goToPreview} src={backword} alt="Backward button" />
	</div>
);

export const Close = ({ closeModal }) => (
	<div className="close-btn">
		<img onClick={closeModal} src={close} alt="Close button" />
	</div>
);

export const Comment = () => (
	<img className="metric-icon" src={comments} alt="comment" />
);
export const Like = () => (
	<img className="metric-icon" src={likes} alt="repost" />
);
export const Repost = () => (
	<img className="metric-icon" src={reposts} alt="like" />
);
export const Impressions = () => (
	<img className="metric-icon" src={impressions} alt="like" />
);
export const Share = () => (
	<img className="metric-icon" src={shares} alt="share" />
);



export const Repost2 = () => (
	<img className="icons" src={repost2} alt="Inbox" />
)
export const QuoteIcon = () => (
	<img className="icons" src={quote} alt="Inbox" />
)