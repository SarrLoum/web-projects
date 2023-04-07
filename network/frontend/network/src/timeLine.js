import { Status, Fleet, Post, Quote, Repost } from "./TLElements";
import "./timeLine.css";

const TimeLine = () => {
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
			<div className='fleet container'>
				<Fleet />
			</div>
		</div>
	);
};

export default TimeLine;
