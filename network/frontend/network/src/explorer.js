import React, { useEffect, useState } from "react";
import { Tendance } from "./explorerElements";
import { SearchBar } from "./suggestElements";
import { Params } from "./myIcons";
import "./explorer.css";

const Explorer = () => {
	const [tendances, setTendances] = useState(null);

	fetch("/Tendances", {
		method: "GET",
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			setTendances(data);
		});

	return (
		<div className='explorer-container'>
			<div className='explorer-header'>
				<h3>Explore</h3>
				<Params />
			</div>
			<div className='tendances-container'>
				<ul>
					{tendance &&
						tendances.map((tendance) => {
							<li>
								<Tendance post={tendance} />
							</li>;
						})}
				</ul>
			</div>
		</div>
	);
};

export default Explorer;
