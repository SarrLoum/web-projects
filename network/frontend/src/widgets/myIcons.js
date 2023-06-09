import apple from "../icons/apple.svg";
import arrowHide from "../icons/arrow-hide.svg";
import arrowUp from "../icons/arrowUp.svg";
import addUser from "../icons/addUser.svg";
import bellNotification from "../icons/bellNotification.svg";
import bookmark from "../icons/bookmark.svg";
import backword from "../icons/backword.svg";
import candleLine from "./icons/candleLine.svg";

import calendar from "../icons/calendar.svg";
import comments from "../icons/comments.svg";
import close from "../icons/close.svg";
import cube from "../icons/cube.svg";
import cube2 from "../icons/cube2.svg";

import earthFill from "../icons/earth-fill.svg";
import gif from "../icons/gif.svg";
import google from "../icons/google.svg";
import hashExplore from "../icons/hashExplore.svg";
import home from "../icons/home.svg";

import impressions from "../icons/impressions.svg";
import inboxAdd from "../icons/inbox-add.svg";
import inboxRequest from "../icons/inbox-request.svg";

import likes from "../icons/likes.svg";
import list from "../icons/list.svg";
import logout from "../icons/logout.svg";
import mapin from "../icons/mapin.svg";
import mediafile from "../icons/mediafile.svg";
import more from "../icons/more.svg";
import more2 from "../icons/more2.svg";

import paperPlane from "../icons/paperPlane.svg";
import parameters from "../icons/parameters.svg";
import parameters2 from "../icons/parameters2.svg";

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
export const ArrowDown = () => <img src={arrowHide} alt="Calendar" />;
export const ArrowUp = () => <img src={arrowUp} alt="Calendar" />;

export const Candle = () => (
	<img className="status-icons" src={candleLine} alt="Calendar" />
);

export const Calendar = () => (
	<img className="status-icons" src={calendar} alt="Calendar" />
);
export const Cube2 = () => <img className="logo" src={cube2} alt="Cube logo" />;

export const InboxAdd = () => <img src={inboxAdd} alt="new message" />;
export const InboxRequest = () => <img src={inboxRequest} alt="resquest" />;

export const Gif = () => <img className="status-icons" src={gif} alt="Gif" />;
export const Home = () => <img className="icons" src={home} alt="Home" />;
export const Image = () => (
	<img className="status-icons" src={mediafile} alt="media" />
);
export const List = () => <img className="icons" src={list} alt="List" />;

export const MapIn = () => (
	<img className="status-icons" src={mapin} alt="Map in user" />
);
export const More = () => <img className="icons" src={more} alt="More" />;
export const More2 = () => <img src={more2} alt="More icon" />;

export const Person = () => <img className="icons" src={person} alt="User" />;
export const Polls = () => (
	<img className="status-icons" src={polls} alt="Polls" />
);

export const Smiley = () => (
	<img className="status-icons" src={smiley} alt="Smiley" />
);
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
export const Params2 = () => (
	<img className="icons" src={parameters2} alt="Parameters" />
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
);
export const QuoteIcon = () => (
	<img className="icons" src={quote} alt="Inbox" />
);
export const Earth = () => <img src={earthFill} alt="Inbox" />;

// High-level icons
export const Backword = ({ goToPreview }) => (
	<img
		className="close-btn"
		onClick={goToPreview}
		src={backword}
		alt="Backward button"
	/>
);

export const Close = ({ closeModal }) => (
	<a onClick={closeModal} className="close-btn">
		<img src={close} alt="Close button" />
	</a>
);
