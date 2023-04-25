import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import TimeLine from "./timeLine";
import Suggestions from "./suggest";
import { LoginForm } from "./modalLogIn";
import { SignupForm } from "./modalSignUp";
import "./App.css";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [openModal, setOpenModal] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	function getCurrentUser(userData) {
		setCurrentUser(userData);
	}

	function openLoginModal() {
		setOpenModal("login");
	}

	function openSignupModal() {
		setOpenModal("signup");
	}

	function closeModal() {
		setOpenModal(null);
	}

	function renderModalContent() {
		if (openModal === "login") {
			return <LoginForm isClose={closeModal} getUser={getCurrentUser} />;
		}
		if (openModal === "signup") {
			return <SignupForm isClose={closeModal} getUser={getCurrentUser} />;
		}
		return null;
	}

	return (
		<div className='App-container'>
			<Sidebar UserAuth={isAuthenticated} />
			<TimeLine UserAuth={isAuthenticated} user={currentUser} />
			<Suggestions UserAuth={isAuthenticated} />

			{!isAuthenticated && (
				<div className='bottom-signal'>
					<div className='invite-signal'>
						<h6>Don't miss on what's happening.</h6>
						<p>Twitter users are the first to know.</p>
					</div>
					<div className='auth-buttons'>
						<div onClick={openLoginModal} role='button' className='Sign-in'>
							<span>Log in</span>
						</div>
						<div onClick={openSignupModal} role='button' className='Sign-up'>
							<span>Sign up</span>
						</div>
					</div>
					{renderModalContent()}
				</div>
			)}
		</div>
	);
}

export default App;
