import bellNotification from "./icons/bellNotification.svg";
import bookmark from "./icons/bookmark.svg";
import cube from "./icons/cube.svg";
import hashExplore from "./icons/hashExplore.svg";
import home from "./icons/home.svg";
import list from "./icons/list.svg";
import more from "./icons/more.svg";
import more2 from "./icons/more2.svg";
import paperPlane from "./icons/paperPlane.svg";
import person from "./icons/person.svg";
import "./myIcons.css";

export const Notification = () => (
	<img src={bellNotification} alt='Notification icon'></img>
);

export const Bookmark = () => <img src={bookmark} alt='Bookmark icon'></img>;

export const Cube = () => <img src={cube} alt='Cube logo'></img>;

export const HashExplore = () => <img src={hashExplore} alt='Cube logo'></img>;

export const Home = () => <img src={home} alt='Home icon'></img>;

export const List = () => <img src={list} alt='List icon'></img>;

export const More = () => <img src={more} alt='More icon'></img>;

export const More2 = () => <img src={more2} alt='More icon'></img>;

export const PaperPlane = () => <img src={paperPlane} alt='Message icon'></img>;

export const Person = () => <img src={person}></img>;
