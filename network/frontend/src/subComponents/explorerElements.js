import React, { useEffect, useState } from "react";
import { Reply, Repost, Quote, Post } from "../posType";
import axios from "axios";
import "./explorer.css";

export const Tendance = () => {
	const [tendances, setTendances] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/tendances")
			.then((response) => {
				console.log(response.data);
				setTendances(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	/*let posts, replies, quotes, reposts;
	if (tendances) {
		({posts, replies, quotes, reposts} = tendances);
	}*/

	function renderTendances() {
		let posts = [],
			replies = [],
			quotes = [],
			reposts = [];
		if (tendances) {
			({
				posts = [],
				replies = [],
				quotes = [],
				reposts = [],
			} = tendances);
		}
		console.log(posts);

		const allPosts = posts.concat(replies, quotes, reposts);

		for (let i = allPosts.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[allPosts[i], allPosts[j]] = [allPosts[j], allPosts[i]];
		}

		return (
			<>
				{allPosts &&
					allPosts.map((singlePost) => {
						console.log(singlePost);
						if (singlePost && singlePost.is_post === true) {
							return <Post post={singlePost} />;
						} else if (singlePost && singlePost.is_reply === true) {
							return <Reply reply={singlePost} />;
						}
						/* if (singlePost && singlePost.is_quote === true) {
								return <Quote quote={singlePost} />;
							} else if (singlePost && singlePost.is_repost === true) {
								return <Repost repost={singlePost} />;
							}
							return null;*/
					})}
			</>
		);
	}

	return <div className="tendance">{renderTendances()}</div>;
};
