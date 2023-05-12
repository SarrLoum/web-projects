import { User } from "../mainComponents/user";
import { More2, Search } from "../widgets//myIcons";

import "./suggestElements.css";

export const SearchBar = () => {
	return (
		<div className="search-bar">
			<Search />
			<input type="text" name="search" placeholder="Search Twitter" />
		</div>
	);
};

export const TrendSuggest = () => {
	return (
		<div className="trends-container">
			<h1>Trends for you</h1>
			<div className="trends">
				<Trending />
				<Trending />
				<Trending />
			</div>
		</div>
	);
};

export const UserSuggest = (user, userProfile) => {
	return (
		<div className="user-suggest">
			<h1>Who to follow</h1>
			<div className="follow-user">
				<User user={user} userProfile={userProfile} />
				<div className="follow-btn">
					<span>Follow</span>
				</div>
			</div>
		</div>
	);
};

export const Trending = () => {
	return (
		<div className="trending-container">
			<div className="trending-type">
				<span></span>
				<More2 />
			</div>
			<h5></h5>
			<p></p>
		</div>
	);
};
