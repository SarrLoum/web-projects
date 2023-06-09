import { useEffect, useState } from "react";
import {
	SearchBar,
	TrendSuggest,
	UserSuggest,
} from "../subComponents/suggestElements";
import { Inbox } from "./inbox";
import { SignUpOptions } from "../theModals/modalSignUp";
import Braided from "../icons/Braided.JPG";
import "./suggest.css";

const Suggestions = ({ UserAuth, currentUser }) => {
	return (
		<div className="suggest-container">
			{UserAuth ? (
				<>
					<SearchBar />
					<UserSuggest currentUser={currentUser} />
					<TrendSuggest />
					<Inbox currentUser={currentUser} />
				</>
			) : (
				<SignUpOptions />
			)}
		</div>
	);
};

export default Suggestions;
