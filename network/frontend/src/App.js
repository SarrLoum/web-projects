import React, { useEffect, useState } from "react";
import Sidebar from "./mainComponents/sidebar";
import TimeLine from "./mainComponents/timeLine";
import Explorer from "./mainComponents/explorer";
import Suggestions from "./mainComponents/suggest";
import { LoginForm } from "./theModals/modalLogIn";
import { SignupForm } from "./theModals/modalSignUp";
import "./App.css";
function App() {
	const [activeComponent, setActiveComponent] = useState("Timeline");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [openModal, setOpenModal] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	function handleButtonClick(component) {
		setActiveComponent(component);
	}

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
		<div className="App-container">
			<Sidebar
				handleButton={handleButtonClick}
				UserAuth={isAuthenticated}
				getUser={getCurrentUser}
				currentUser={currentUser}
			/>
			{isAuthenticated ? (
				<>
					{activeComponent === "Timeline" && (
						<TimeLine user={currentUser} />
					)}
					{activeComponent === "Explorer" && <Explorer />}
				</>
			) : (
				<Explorer />
			)}

			<Suggestions UserAuth={isAuthenticated} />

			{/* Authentifacted signal invite*/}
			{!isAuthenticated && (
				<div className="bottom-signal">
					<div className="invite-signal">
						<h6>Don't miss on what's happening.</h6>
						<p>Twitter users are the first to know.</p>
					</div>
					<div className="auth-buttons">
						<div
							onClick={openLoginModal}
							role="button"
							className="Sign-in"
						>
							<span>Log in</span>
						</div>
						<div
							onClick={openSignupModal}
							role="button"
							className="Sign-up"
						>
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
