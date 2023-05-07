import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tendance } from "./explorerElements";
import { Params } from "./myIcons";
import "./explorer.css";

const Explorer = () => {
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
	console.log(tendances?.posts);

	let posts, replies, quotes, reposts;
	if (tendances) {
		({posts, replies, quotes, reposts} = tendances);
	}

	console.log(posts);
	console.log(replies);
	console.log(quotes);
	console.log(reposts);


	/*const {posts, replies, quotes, reposts} = tendances;

	console.log(posts);
	console.log(replies;)
	console.log(quotes);
	console.log(reposts);*/

	return (
		<div className='explorer-container'>
			<div className='explorer-header'>
				<h3>Explore</h3>
				<Params />
			</div>
			<div className='tendances-container'>
				<ul></ul>
			</div>
		</div>
	);
};

export default Explorer;
