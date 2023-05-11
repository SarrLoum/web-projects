import { SearchBar, TrendSuggest, UserSuggest } from "./suggestElements";
import { SignUpOptions } from "./modalSignUp";
import Braided from "./icons/Braided.JPG";
import "./suggest.css";
import { useEffect, useState } from "react";

const Suggestions = ({ UserAuth }) => {
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
		<div className='suggest-container'>
			{UserAuth ? (
				<>
					<SearchBar />
					<TrendSuggest />
					<UserSuggest user={user} userProfile={userProfile} />{" "}
				</>
			) : (
				<SignUpOptions />
			)}
		</div>
	);
};

export default Suggestions;
