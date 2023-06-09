import { useEffect, useState } from "react";
import { User } from "../mainComponents/user";

import { More2, Search } from "../widgets//myIcons";
import "./suggestElements.css";
import axios from "axios";

export const SearchBar = () => {
	return (
		<div className="search-bar">
			<div>
				<Search />
			</div>
			<input type="text" name="search" placeholder="Search Twitter" />
		</div>
	);
};

export const TrendSuggest = ({ currentUser }) => {
	const accessToken = localStorage.getItem("accessToken");
	const [trends, setTrends] = useState(null);
	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/trending`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			})
			.then((response) => {
				console.log(response.data);
				setTrends(response.data);
			});
	}, []);

	if (trends) {
		console.log("trending right now:", trends);
	}

	return (
		<div className="trends-container">
			<h1>Hot Topic for you</h1>
			<div className="trends">
				<Trending />
			</div>
		</div>
	);
};

export const UserSuggest = ({ currentUser }) => {
	let userId = currentUser.id;
	const accessToken = localStorage.getItem("accessToken");
	const [suggestions, setSuggestions] = useState(null);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/user/${userId}/suggestions`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			})
			.then((response) => {
				console.log(response.data);
				setSuggestions(response.data);
			});
	}, []);

	function renderSuggestions() {
		if (suggestions) {
			return suggestions.map((suggestedUser) => {
				console.log("suggested User:", suggestedUser);
				return (
					<>
						<div className="suggest-wrapper">
							<User user={suggestedUser} />
							<div className="follow-btn">
								<span>Follow</span>
							</div>
						</div>
					</>
				);
			});
		}
	}

	return (
		<div className="suggestions-container">
			<h1>Who to follow</h1>
			<div className="suggested-users">{renderSuggestions()}</div>
		</div>
	);
};

export const Trending = ({ trend }) => {
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
