import cube from "./icons/cube.svg";
import home from "./icons/home.svg";
import hashExplore from "./icons/hashExplore.svg";
import bellNotification from "./icons/bellNotification.svg";
import paperPlane from "./icons/paperPlane.svg";
import bookmark from "./icons/bookmark.svg";
import list from "./icons/list.svg";
import person from "./icons/person.svg";
import more from "./icons/more.svg";
import more2 from "./icons/more2.svg";
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
