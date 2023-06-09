import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

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

	function getCurrentUser(userData) {
		setCurrentUser(userData);
	}
	useEffect(() => {
		const refreshToken = localStorage.getItem("refreshToken");
		const accessToken = localStorage.getItem("accessToken");
		console.log(`get accessToken from: ${accessToken}`);
		console.log(`get refreshToken from: ${refreshToken}`);

		if (refreshToken && accessToken) {
			try {
				// Check if token is expired or any other validation you need
				const payload = jwt_decode(accessToken);
				const expirationTime = new Date(payload.exp * 1000);
				const currentTime = new Date();

				if (currentTime >= expirationTime) {
					axios
						.post("http://localhost:8000/api/token/refresh/", {
							refresh: refreshToken,
						})
						.then((response) => {
							const { access, refresh } = response.data;
							localStorage.setItem("accessToken", access);
							localStorage.setItem("refreshToken", refresh);

							const decodedToken = jwt_decode(access);
							getCurrentUser(decodedToken.user);
							window.location.reload();
						})
						.catch((error) => {
							console.error("Failed to refresh Token:", error);
							setIsAuthenticated(false);
							setCurrentUser(null);
						});
				} else {
					setIsAuthenticated(true);
					getCurrentUser(payload.user);
				}
			} catch (error) {
				if (error.name === "TokenExpiredError") {
					console.error("Acces token expired");
				} else if (error.name === "JsonWebTokenError") {
					console.error("Failed to decode token:", error.message);
				} else {
					console.error(
						"An error occurred while decoding token:",
						error
					);
				}
				// Handle token decoding/verification error
				setIsAuthenticated(false);
				setCurrentUser(null);
			}
		} else {
			// Handle token decoding/verification error
			setIsAuthenticated(false);
			setCurrentUser(null);
		}
	}, []);

	function handleButtonClick(component) {
		setActiveComponent(component);
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
						<TimeLine currentUser={currentUser} />
					)}
					{activeComponent === "Explorer" && <Explorer />}
				</>
			) : (
				<Explorer />
			)}

			<Suggestions UserAuth={isAuthenticated} currentUser={currentUser} />

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
