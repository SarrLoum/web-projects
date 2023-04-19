import { useState } from "react";
import { Apple, Backword, Close, Cube, Google } from "./myIcons";
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
		<div className={`modal ${isOpen ? "login-modal" : ""}`}>
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
				<Cube />
			</div>
			<div className='modal-body'>
				<h1>Connectez-vous à Twitter</h1>
				<div className='google-login stack-gap'>
					<Google />
					<span>Se connecter avec google</span>
				</div>
				<div className='apple-login'>
					<Apple /> <span>Se Connecter avec Apple</span>
				</div>
				<div className='else-break'>
					<br />
					<span>else</span>
					<br />
				</div>
				<div className='login-email'>
					<input
						type='email'
						placeholder='Enter your email here'
						onChange={emailOnChange}
					/>
				</div>
				<div onClick={displayNext} className='next-btn stack-gap'>
					<p>Suivant</p>
				</div>
				<div className='forgotten-password'>
					<p>Mots de passe oublié?</p>
				</div>
			</div>
		</>
	);
};

export const LoginStep2 = ({ displayPreview, onClose, userEmail }) => {
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
			.then((result) => {
				console.log(result);
			});
	}
	return (
		<>
			<div className='modal-header'>
				<Backword goToPreview={displayPreview} />
			</div>
			<div className='f-container'>
				<form>
					<div className='input-field'>
						<label htmlFor='email-input'>Email</label>
						<input
							name='email'
							id='email-input'
							type='email'
							value={userEmail}
						/>
					</div>
					<div className='input-field'>
						<label htmlFor='password-input'>Password</label>
						<input
							name='password'
							id='passwordinput'
							type='password'
							onChange={handlePassword}
						/>
					</div>
					<div className='modal-footer'>
						<input type='submit' value='Se connecter' onSubmit={subitForm} />
					</div>
				</form>
			</div>
		</>
	);
};
