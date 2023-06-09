import { useState } from "react";
import axios from "axios";

import {
	Apple,
	OutLog,
	OtherAccount,
	Close,
	Cube2,
	Google,
} from "../widgets/myIcons";
import "./modals.css";

export const LoginForm = ({ isOpen, isClose, getUser }) => {
	const [username, setUsername] = useState("");
	const [nextStep, setNextStep] = useState(false);

	function handleUsername(event) {
		setUsername(event.target.value);
	}

	function displayNext() {
		setNextStep(true);
	}

	function displayPreview() {
		setNextStep(false);
	}

	return (
		<div className={`modal ${isOpen ? "open" : ""}`}>
			<div className="modal-content">
				{nextStep ? (
					<LoginStep2
						displayPreview={displayPreview}
						onClose={isClose}
						username={username}
						getUser={getUser}
					/>
				) : (
					<LoginStep1
						displayNext={displayNext}
						onClose={isClose}
						usernameOnChange={handleUsername}
					/>
				)}
			</div>
		</div>
	);
};

export const LoginStep1 = ({ displayNext, onClose, usernameOnChange }) => {
	return (
		<>
			<div className="modal-header">
				<Close closeModal={onClose} />
				<Cube2 />
			</div>
			<div className="modal-body">
				<h1>Sign in to Twitter</h1>
				<div className="google-login stack-gap">
					<Google />
					<span>Sign in with Google</span>
				</div>
				<div className="apple-login">
					<Apple /> <span>Sign in with Apple</span>
				</div>
				<div className="else-break">
					<hr />
					<span>else</span>
					<hr />
				</div>
				<div className="login-email">
					<input
						type="text"
						placeholder="Enter your email here"
						onChange={usernameOnChange}
					/>
				</div>
				<div onClick={displayNext} className="next-btn stack-gap">
					<span>Next</span>
				</div>
				<div className="forgotten-password">
					<span>Forgot password?</span>
				</div>
			</div>
		</>
	);
};

export const LoginStep2 = ({ onClose, username, getUser }) => {
	const [password, setPassword] = useState("");

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:8000/api/token/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ username, password }),
		});

		console.log(response);

		if (response.status === 200) {
			const { refresh, access } = await response.json();
			localStorage.setItem("refreshToken", refresh);
			localStorage.setItem("accessToken", access);
			window.location.reload();
			console.log(`the refresh token: ${refresh}`);
			console.log(`the acces token: ${access}`);
		} else {
			alert("An error occurred");
		}
	};
	return (
		<>
			<div className="modal-header">
				<Close closeModal={onClose} />
			</div>
			<form method="POST">
				<div className="f-container">
					<div className="input-field disabled">
						<label htmlFor="email-input">Email</label>
						<br />
						<input
							name="email"
							id="email-input"
							type="text"
							value={username}
							disabled
						/>
					</div>
					<div className="input-field">
						<label htmlFor="password-input">Password</label>
						<br />
						<input
							name="password"
							id="password-input"
							type="password"
							onChange={handlePassword}
						/>
					</div>
				</div>
				<div className="modal-footer">
					<input
						onClick={handleLogin}
						type="submit"
						value="Se connecter"
					/>
				</div>
			</form>
		</>
	);
};

export const UserLogsModal = ({ onClose }) => {
	const [loginModal, setloginModal] = useState(null);

	// Function that sets the state  of the loginModal
	function openLoginModal() {
		setloginModal("login");
	}

	// Function that renders the loginModal when its state variable is set
	function renderLoginModal() {
		if (loginModal === "login") {
			return <LoginForm isClose={onClose} />;
		} else {
			return null;
		}
	}

	// Function that log the user out
	function logUserOut() {
		fetch("/logout", {
			method: "POST",
		})
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			});
	}

	return (
		<div className="logout-container">
			<div className="ohter-account" onClick={openLoginModal}>
				<OtherAccount />
				<span>Add account</span>
			</div>
			<div className="log-out" onClick={logUserOut}>
				<OutLog />
				<span>Log Out</span>
			</div>
			{renderLoginModal()}
		</div>
	);
};
