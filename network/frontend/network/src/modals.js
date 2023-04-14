import { useState } from "react";
import { Cube } from "./myIcons";
import "./modals.css";

export const LoginForm = ({ isOpen, isClose }) => {
	[email, setEmail] = useState("");

	function HandleEmail(event) {
		setEmail(event.target.value);
	}

	return (
		<div className={`Login-container ${isOpen ? "open" : ""}`}>
			<LoginStep1 onClose={isClose} emailOnChange={HandleEmail} />
			<LoginStep2 onClose={isClose} userEmail={email} />
		</div>
	);
};

export const SignupForm = () => {
	return (
		<div className='Login-container'>
			<div className='login-hader'>
				<img src='' alt='' />
			</div>
			<div className='login-type'>
				<h1>Créer votre compte</h1>
				<div className='google-login'></div>
				<div className='apple-login'></div>
				<div>
					<div></div>
					<span>else</span>
					<div></div>
				</div>
				<div>
					<input type='text' />
				</div>
				<div className='login-nextstep'>
					<p>Suivant</p>
				</div>
			</div>
		</div>
	);
};

export const LoginStep1 = ({ onClose, emailOnChange }) => {
	return (
		<>
			<div className='login-header'>
				<Close close={onclose} />
				<Cube />
			</div>
			<div className='login-type'>
				<h1>Connectez-vous à Twitter</h1>
				<div className='google-login'>
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
				<div className='email-container'>
					<input
						onChange={emailOnChange}
						type='email'
						placeholder='Enter your email here'
					/>
				</div>
				<div className='step-btn'>
					<p>Suivant</p>
				</div>
				<div className='password-forgotten'>
					<p>Mots de passe oublié?</p>
				</div>
			</div>
		</>
	);
};

export const LoginStep2 = ({ userEmail }) => {
	return (
		<>
			<div className='login-header'>
				<Backword />
			</div>
			<form className='login-type'>
				<div className='email-container'>
					<label htmlFor='email-input'>Email</label>
					<input name='email' id='email-input' type='email' value={userEmail} />
				</div>
				<div className='password-container'>
					<label htmlFor='password-input'>Password</label>
					<input name='password' id='passwordinput' type='password' />
				</div>
				<input className='step-btn' type='submit' value='Se connecter' />
			</form>
		</>
	);
};

export const TextInput = () => {
	const [value, setValue] = useState("");
	const [height, setHeight] = useState("auto");

	function handleInputChange(event) {
		setValue(event.target.value);
		setHeight(event.target.scrollHeight + "px");
	}
	return (
		<>
			<textarea
				type='textarea'
				name='text'
				id='text-input'
				placeholder="What's hapenning?"
				maxLength='300'
				value={value}
				onChange={handleInputChange}
				style={{ height }}
			></textarea>
		</>
	);
};
