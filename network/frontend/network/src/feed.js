import { Status, Fleet, Post, Quote, Repost } from "./feedElements";
import "./feed.css";

const Feed = () => {
	return (
		<div>
			<div className='home-container'>
				<h4>Home</h4>
			</div>
			<div className='feed-prefenrence'>
				<button className='for-you'>For you</button>
				<button className='following'>Following</button>
			</div>
			<Status />
			<Fleet />
		</div>
	);
};

export default Feed;
