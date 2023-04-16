import { SearchBar, TrendSuggest, UserSuggest } from "./suggestElements";
import { SignupForm } from "./modalSignUp";
import Braided from "./icons/Braided.JPG";
import "./suggest.css";

const Suggestions = () => {
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
		<div>
			<SearchBar />
			<TrendSuggest />
			<UserSuggest user={user} userProfile={userProfile} />
		</div>
	);
};

export default Suggestions;
