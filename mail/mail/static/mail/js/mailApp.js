import { recentSearchItem } from "./utils/components.js"



export const searchEmail = () => {
    const searchForm = document.querySelector(".mail-searchForm");
    const searchFormWrapper = document.querySelector("#searchEmail-form");
    const searchInput = document.querySelector(".search-input");

    searchInput.addEventListener("focus", async () => {
        searchFormWrapper.style.background = "#fff";
        const recentSearches = await getRecentSearch(); // Wait for recentSearches to be fetched
        searchFormWrapper.appendChild(recentSearches);
    });

    searchInput.addEventListener("blur", () => {
        console.log("input has lost focus");
        searchFormWrapper.style.background = "var(--search-bar)";
    });

    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the default form submission
		searchInput.blur();
        const response = await fetch("/search_mail", {
            method: "POST",
            body: JSON.stringify({
                query: searchInput.value,
            }),
        });
        // Handle the response here

        if (response.status === 200) {
            const searchResults = await response.json();
            searchResults.map((emailResult) => {
                // Do something with each emailResult
            });
        }
    });
};

async function getRecentSearch() {
    const recentSearches = document.createElement("div");
    recentSearches.classList.add("recentSearches-div");

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

