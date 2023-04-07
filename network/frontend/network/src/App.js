import React from "react";
import Sidebar from "./sidebar";
import TimeLine from "./timeLine";
import Suggestions from "./suggestion.js";
import "./App.css";

function App() {
	return (
		<div className='App-container'>
			<Sidebar />
			<TimeLine />
		</div>
	);
}

export default App;
