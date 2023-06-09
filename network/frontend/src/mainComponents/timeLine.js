import { Status, Fleet, Feed } from "../subComponents/TLElements";
import Braided from "../icons/Braided.JPG";

import "./timeLine.css";

const TimeLine = ({ currentUser }) => {
	return (
		<div className="TL-container">
			<div className="TL-header">
				<div className="wrapper-tl-header flex column">
					<div className="home-container grow">
						<h4>Home</h4>
					</div>

					<div className="TL-preference flex grow">
						<a href="#" className="for-you flex grow">
							<span> For you</span>
						</a>
						<a href="#" className="following flex grow">
							<span> following</span>
						</a>
					</div>
				</div>
			</div>
			<Status user={currentUser} />
			{/*(<div className="fleets-container">
				<Fleet user={currentUser} />
			</div>)*/}
			<div className="feed">
				<Feed currentUser={currentUser} />
			</div>
		</div>
	);
};

export default TimeLine;
