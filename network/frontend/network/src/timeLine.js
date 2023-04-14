import { Status, Fleet, Post, Quote, Repost } from "./TLElements";
import Braided from "./icons/Braided.JPG";

import "./timeLine.css";

const TimeLine = () => {
	const user = {
		id: 1,
		username: "SarrLoum",
		email: "sarrloum10@gmail.com",
	};

	const userProfile = {
		user: 1,
		avatarUrl: Braided,
		pseudo_name: "SpaceWalker",
	};

	return (
		<div className='TL-container'>
			<div className='home-container'>
				<h4>Home</h4>
			</div>
			<div className='TL-preference'>
				<button className='for-you'>For you</button>
				<button className='following'>Following</button>
			</div>
			<Status userProfile={userProfile} />
			<div className='fleets-container'>
				<Fleet userProfile={userProfile} />
			</div>
			<div className='feed'></div>
		</div>
	);
};

export default TimeLine;
