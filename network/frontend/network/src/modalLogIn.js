import { useState } from "react";
import { Apple, Backword, Close, Cube2, Google } from "./myIcons";
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
			<div className='modal-content'>
				{nextStep ? (
					<LoginStep2
						displayPreview={displayPreview}
						onClose={isClose}
						userEmail={email}
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
			<div className='modal-header'>
				<Close closeModal={onClose} />
				<Cube2 />
			</div>
			<div className='modal-body'>
				<h1>Sign in to Twitter</h1>
				<div className='google-login stack-gap'>
					<Google />
					<span>Sign in with Google</span>
				</div>
				<div className='apple-login'>
					<Apple /> <span>Sign in with Apple</span>
				</div>
				<div className='else-break'>
					<hr />
					<span>else</span>
					<hr />
				</div>
				<div className='login-email'>
					<input
						type='email'
						placeholder='Enter your email here'
						onChange={emailOnChange}
					/>
				</div>
				<div onClick={displayNext} className='next-btn stack-gap'>
					<span>Next</span>
				</div>
				<div className='forgotten-password'>
					<span>Forgot password?</span>
				</div>
			</div>
		</>
	);
};

export const LoginStep2 = ({ onClose, userEmail, getUser }) => {
	const [password, setPassword] = useState("");

	function handlePassword(event) {
		setPassword(event.target.value);
	}

	const data = { userEmail, password };
	function subitForm() {
		fetch("/login", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((result, user) => {
				console.log(result);
				getUser(user);
			});
	}
	return (
		<>
			<div className='modal-header'>
				<Close closeModal={onClose} />
			</div>
			<form method='POST' onSubmit={subitForm}>
				<div className='f-container'>
					<div className='input-field disabled'>
						<label htmlFor='email-input'>Email</label>
						<br />
						<input
							name='email'
							id='email-input'
							type='email'
							value={userEmail}
							disabled
						/>
					</div>
					<div className='input-field'>
						<label htmlFor='password-input'>Password</label>
						<br />
						<input
							name='password'
							id='passwordinput'
							type='password'
							onChange={handlePassword}
						/>
					</div>
				</div>
				<div className='modal-footer'>
					<input type='submit' value='Se connecter' />
				</div>
			</form>
		</>
	);
};
