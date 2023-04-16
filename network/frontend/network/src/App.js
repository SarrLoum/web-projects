import React, { useState } from "react";
import Sidebar from "./sidebar";
import TimeLine from "./timeLine";
import Suggestions from "./suggest";
import { LoginForm } from "./modalLogIn";
import { SignupForm } from "./modalSignUp";
import "./App.css";

function App() {
	const [openModal, SetOpenModal] = useState(false);
	function openModal() {
		SetOpenModal(true);
	}
	function closeModal() {
		SetOpenModal(false);
	}

	return (
		<div className='App-container'>
			<Sidebar />
			<TimeLine />
			<Suggestions />
			<div className='bottom-signal'>
				<div className='invite-signal'>
					<h4>Don't miss on what's hapenning.</h4>
					<p>Twitter users are the first to know.</p>
				</div>
				<div className='auth-buttons'>
					<div className='Sign-in'>
						<span>Sign in</span>
						<LoginForm isOpen={openModal} isClose={closeModal} />
					</div>
					<div className='Sign-up'>
						<span>Sign up</span>
						<SignupForm isOpen={openModal} isClose={closeModal} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
