import React, { useEffect, useState } from "react";
import { SearchBar } from "./suggestElements";
import { Params } from "./myIcons";
import "./explorer.css";

const Explorer = () => {
	const [tendances, setTendances] = useState(null);

	function getTendances() {
		fetch("/Tendances", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setTendances(data);
			});
	}

	return (
		<div className='explorer-container'>
			<div className='explorer-header'>
				<SearchBar />
				<Params />
			</div>
			<h4>Tendances for You</h4>
			<div className='tendances-container'>
				{tendances ? (
					tendances.map((tendance) => {
						<Tendance post={tendance} />;
					})
				) : (
					<h2>No Tendances Yet</h2>
				)}
			</div>
		</div>
	);
};

export default Explorer;
