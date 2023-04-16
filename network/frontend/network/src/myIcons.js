import bellNotification from "./icons/bellNotification.svg";
import bookmark from "./icons/bookmark.svg";
import backword from "./icons/backword.svg";

import calendar from "./icons/calendar.svg";
import close from "./icons/close.svg";
import cube from "./icons/cube.svg";
import gif from "./icons/gif.svg";

import hashExplore from "./icons/hashExplore.svg";
import home from "./icons/home.svg";

import list from "./icons/list.svg";
import mapin from "./icons/mapin.svg";
import mediafile from "./icons/mediafile.svg";
import more from "./icons/more.svg";
import more2 from "./icons/more2.svg";

import paperPlane from "./icons/paperPlane.svg";
import person from "./icons/person.svg";
import polls from "./icons/polls.svg";

import smiley from "./icons/smiley.svg";
import search from "./icons/search.svg";

import "./myIcons.css";

export const Cube = () => (
	<img className='cube-logo' src={cube} alt='Cube logo'></img>
);

export const Home = () => (
	<img className='icons' src={home} alt='Home icon'></img>
);

export const HashExplore = () => (
	<img className='icons' src={hashExplore} alt='Cube logo'></img>
);

export const Notification = () => (
	<img className='icons' src={bellNotification} alt='Notification icon'></img>
);

export const PaperPlane = () => (
	<img className='icons' src={paperPlane} alt='Message icon'></img>
);

export const Bookmark = () => (
	<img className='icons' src={bookmark} alt='Bookmark icon'></img>
);

export const List = () => (
	<img className='icons' src={list} alt='List icon'></img>
);

export const Person = () => (
	<img className='icons' src={person} alt='User'></img>
);

export const More = () => (
	<img className='icons' src={more} alt='More icon'></img>
);

export const More2 = () => <img src={more2} alt='More icon'></img>;

export const Image = () => <img src={mediafile} alt='Image' />;

export const Gif = () => <img src={gif} alt='Gif' />;

export const Polls = () => <img src={polls} alt='Polls' />;

export const Smiley = () => <img src={smiley} alt='Smiley' />;

export const Calendar = () => <img src={calendar} alt='Calendar' />;

export const MapIn = () => <img src={mapin} alt='Map in user' />;

export const Search = () => <img src={search} alt='search' />;

export const Close = ({ closeModal }) => (
	<div className='close-btn'>
		<img onClick={closeModal} src={close} alt='Close button' />
	</div>
);

export const Backword = ({ goToPreview }) => (
	<div className='close-btn'>
		<img onClick={goToPreview} src={backword} alt='Close button' />
	</div>
);
