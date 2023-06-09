import React, { useEffect, useState } from "react";
import { Reply, Repost, Quote, Post } from "../widgets/posType";
import axios from "axios";
import "../mainComponents/explorer.css";

export const Tendance = () => {
	const [tendances, setTendances] = useState(null);
	const accessToken =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1MTk0ODg0LCJpYXQiOjE2ODUxOTQyODQsImp0aSI6ImFhNGViNWJkNDk1MDRiNmY4MzczN2M2MTY0YWEzYzJhIiwidXNlcl9pZCI6MywidXNlciI6eyJpZCI6MywidXNlcm5hbWUiOiJfaXNjaXNfIiwiZW1haWwiOiJpc2Npc0B4bWFpbC5jb20iLCJiaXJ0aGRhdGUiOiIyMDAyLTAzLTEzIiwicGFzc3dvcmQiOiJwYmtkZjJfc2hhMjU2JDYwMDAwMCRrclFJR1RTU0hiWVNmbFNzUUQxRWRsJHR4V0Q1TDlXVW9NZ3dqbHlhZXpwUmlWcVFFVjFPT0VocnJHbWhtY3M2SDQ9IiwicHJvZmlsZSI6eyJpZCI6MywiYXZhdGFyIjoiL21lZGlhL2x1ZmZ5LmpwZyIsImltZ2NvdmVyIjoiL21lZGlhL2x1ZmZ5X2Jhbm5lci5qcGciLCJwc2V1ZG9fbmFtZSI6InZhbmVzc2EiLCJiaW8iOiJNb25rZXkgRC4gTHVmZnlcdWQ4M2NcdWRmZjRcdTIwMGRcdTI2MjBcdWZlMGYiLCJsb2NhdGlvbiI6IkdyYW5kLUxpbmUiLCJ3ZWJzaXRlIjoiIn19fQ.tnZ-FD4uyUqv2udKTCdAI4pzp_O1UsdPXEsIXhKiYLM";

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
