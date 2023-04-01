import { Status, Fleet, Post, Quote, Repost } from "./feedElements";
import './feed.css'

const feed = () => {
	return (
		<div>
			<h4>Home</h4>
			<div className='feed-prefenrence'>
				<button className='for-you'>For you</button>
				<button className='following'>Following</button>
			</div>
			<Status />
			<Fleet />
			<Feed />
		</div>
	);
};
