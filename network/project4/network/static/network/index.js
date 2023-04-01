document.addEventListener("DOMContentLoaded", function () {
	document.querySelector("#post-test").addEventListener(
		"click",
		() =>
			function () {
				console.log("loadPost function is called");
				fetch("/feed/")
					.then((response) => response.json())
					.then((listposts) => {
						if (typeof listposts !== "object") {
							console.error("Response is not an object");
							return;
						}
						console.log(listposts);

						let feed = "";

						for (const post in listposts[1]) {
							console.log(`Post: ${post.id}`);
							let eachpost = `<li>
                                                <div>
                                                    <h6>${post.user}</h6>
                                                    <p>${post.text}</p>
                                                    <div>${post.media}</div>
                                                    <span>${post.timestamp}</span>
                                                </div>
                                            </li>`;
							feed += eachpost;
						}

						const root = document.querySelector("#root");
						const postList = document.createElement("div");
						postList.innerHTML = `<ul>${feed}</ul>`;
						root.appendChild(postList);
					});
			}
	);
});
