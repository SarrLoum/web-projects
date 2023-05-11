import { useState } from "react";
import { Apple, OutLog, OtherAccount, Close, Cube2, Google } from "./myIcons";
import "./modals.css";

export const LoginForm = ({ isOpen, isClose }) => {
	const [email, setEmail] = useState("");
	const [nextStep, setNextStep] = useState(false);

	function handleEmail(event) {
		setEmail(event.target.value);
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
						userName={email}
					/>
				) : (
					<LoginStep1
						displayNext={displayNext}
						onClose={isClose}
						emailOnChange={handleEmail}
					/>
				)}
			</div>
		</div>
	);
};

export const LoginStep1 = ({ displayNext, onClose, emailOnChange }) => {
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
						onChange={emailOnChange}
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

export const LoginStep2 = ({ onClose, userName, getUser }) => {
	const [password, setPassword] = useState("");

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	function subitForm() {
		fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({
				username: userName,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((result, user) => {
				console.log("submitfuncion is called");
				console.log(result);
				getUser(user);
			})
			.catch((error) => console.log(error));
	}
	return (
		<>
			<div className="modal-header">
				<Close closeModal={onClose} />
			</div>
			<form method="POST" onSubmit={subitForm}>
				<div className="f-container">
					<div className="input-field disabled">
						<label htmlFor="email-input">Email</label>
						<br />
						<input
							name="email"
							id="email-input"
							type="text"
							value={userName}
							disabled
						/>
					</div>
					<div className="input-field">
						<label htmlFor="password-input">Password</label>
						<br />
						<input
							name="password"
							id="passwordinput"
							type="password"
							onChange={handlePassword}
						/>
					</div>
				</div>
				<div className="modal-footer">
					<input type="submit" value="Se connecter" />
				</div>
			</form>
		</>
	);
};

export const UserLogsModal = ({ onClose, currentUser, getUser }) => {
	const [loginModal, setloginModal] = useState(null);

	// Function that sets the state  of the loginModal
	function openLoginModal() {
		setloginModal("login");
	}

	// Function that renders the loginModal when its state variable is set
	function renderLoginModal() {
		if (loginModal === "login") {
			return <LoginForm isClose={onClose} getUser={getUser} />;
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
