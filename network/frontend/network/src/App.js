import React from "react";
import Sidebar from "./sidebar";
import TimeLine from "./timeLine";
import Suggestions from "./suggest";
import "./App.css";

function App() {
	return (
		<div className='App-container'>
			<Sidebar />
			<TimeLine />
			<Suggestions />
		</div>
	);
}

export default App;
