import { Status, Fleet, Post, Quote, Repost } from "./TLElements";
import "./feed.css";

const timeLine = () => {
	return (
		<div className='TL-container'>
			<div className='home-container'>
				<h4>Home</h4>
			</div>
			<div className='TL-prefenrence'>
				<button className='for-you'>For you</button>
				<button className='following'>Following</button>
			</div>
			<Status />
			<Fleet />
		</div>
	);
};

export default Feed;
