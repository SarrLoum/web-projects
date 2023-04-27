import apple from "./icons/apple.svg";
import addUser from "./icons/addUser.svg"
import bellNotification from "./icons/bellNotification.svg";
import bookmark from "./icons/bookmark.svg";
import backword from "./icons/backword.svg";

import calendar from "./icons/calendar.svg";
import close from "./icons/close.svg";
import cube from "./icons/cube.svg";
import cube2 from "./icons/cube2.svg";

import gif from "./icons/gif.svg";
import google from "./icons/google.svg";

import hashExplore from "./icons/hashExplore.svg";
import home from "./icons/home.svg";

import list from "./icons/list.svg";
import lougout from ".icons/lougout.svg";
import mapin from "./icons/mapin.svg";
import mediafile from "./icons/mediafile.svg";
import more from "./icons/more.svg";
import more2 from "./icons/more2.svg";

import paperPlane from "./icons/paperPlane.svg";
import parameters from "./icons/parameters.svg";
import person from "./icons/person.svg";
import polls from "./icons/polls.svg";

import smiley from "./icons/smiley.svg";
import search from "./icons/search.svg";

import "./myIcons.css";

// Simple icons
export const Calendar = () => <img src={calendar} alt='Calendar' />;
export const Image = () => <img src={mediafile} alt='Image' />;
export const MapIn = () => <img src={mapin} alt='Map in user' />;
export const More2 = () => <img src={more2} alt='More icon' />;
export const Polls = () => <img src={polls} alt='Polls' />;
export const Smiley = () => <img src={smiley} alt='Smiley' />;
export const Search = () => <img src={search} alt='search' />;
export const Gif = () => <img src={gif} alt='Gif' />;

export const Apple = () => (
	<img className='icons' src={apple} alt='Apple logo' />
);
export const Google = () => (
	<img className='icons' src={google} alt='Google logo' />
);

// mid-icons
export const Bookmark = () => (
	<img className='icons' src={bookmark} alt='Bookmark ' />
);

export const Cube = () => (
	<img className='cube-logo' src={cube} alt='Cube logo' />
);
export const Cube2 = () => <img className='logo' src={cube2} alt='Cube logo' />;

export const Home = () => <img className='icons' src={home} alt='Home' />;

export const HashExplore = () => (
	<img className='icons' src={hashExplore} alt='Explorer' />
);

export const List = () => <img className='icons' src={list} alt='List' />;

export const More = () => <img className='icons' src={more} alt='More' />;

export const Notification = () => (
	<img className='icons' src={bellNotification} alt='Notification' />
);

export const PaperPlane = () => (
	<img className='icons' src={paperPlane} alt='Inbox' />
);

export const Person = () => <img className='icons' src={person} alt='User' />;

// High-level icons
export const Close = ({ closeModal }) => (
	<div className='close-btn'>
		<img onClick={closeModal} src={close} alt='Close button' />
	</div>
);

export const Backword = ({ goToPreview }) => (
	<div className='close-btn'>
		<img onClick={goToPreview} src={backword} alt='Backward button' />
	</div>
);

export const Params = () => (
	<img className='icons' src={parameters} alt='Parameters' />
);

export const LogOut = () => {
	<img src={lougout} alt='Log-out' />;
};

export const OtherAccount = () => {
	<img src={addUser} alt='Add account' />;
}