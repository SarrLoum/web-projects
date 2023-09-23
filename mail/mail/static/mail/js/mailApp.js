import { recentSearchItem } from "./utils/components.js";

export const searchEmail = () => {
	const searchForm = document.querySelector(".search-form");
	const searchFormWrapper = document.querySelector("#searchInput-Div");
	const recentSearchesWrapper = document.querySelector(
		".recentSearches-wrapper"
	);
	const searchInput = document.querySelector(".search-input");

	searchInput.addEventListener("focus", async () => {
		searchFormWrapper.style.background = "#fff";
		const recentSearches = await getRecentSearch(); // Wait for recentSearches to be fetched
		
		searchForm.style.background = "#fff";
		searchForm.style.borderRadius = "1.25em";
		
		recentSearchesWrapper.appendChild(recentSearches);
		recentSearchesWrapper.style.display = "block";
	});

	searchInput.addEventListener("blur", () => {
		console.log("input has lost focus");
		const recentSearches = document.querySelector("recentSearches");
		recentSearchesWrapper.removeChild(recentSearches) = "";

		searchForm.style.background = "transparent";
		searchForm.style.borderRadius = "none";

		recentSearchesWrapper.style.display = "none";

		searchFormWrapper.style.background = "var(--search-bar)";
	});

	searchForm.addEventListener("submit", async (event) => {
		event.preventDefault(); // Prevent the default form submission
		searchInput.blur();
		searchForm.style.background = "transparent";
		searchForm.style.borderRadius = "none";


		recentSearchesWrapper.style.display = "none"; 

		/*const recentSearches = document.querySelector("recentSearches");
		recentSearchesWrapper.removeChild(recentSearches) = "";*/

		const response = await fetch("/search_mail", {
			method: "POST",
			body: JSON.stringify({
				query: searchInput.value,
			}),
		});
		// Handle the response here

		if (response.status === 200) {
			const searchResults = await response.json();
			const { resultUser, resultEmails } = searchResults

			// Show the mailbox and hide other views
			//const contentHeader0 = document.querySelector(".content-header0");


			displayEmails(resultEmails)

		}
	});
};

async function getRecentSearch() {
	const recentSearches = document.createElement("div");
	recentSearches.classList.add("recentSearches");

	const response = await fetch("/recent_search");

	if (response.status === 200) {
		const recentlySearched = await response.json();
		recentlySearched.map((recentSearch) => {
			const recentSearchItemDiv = recentSearchItem(recentSearch); // Create the search item
			recentSearches.appendChild(recentSearchItemDiv);
		});
	}
	return recentSearches;
}
