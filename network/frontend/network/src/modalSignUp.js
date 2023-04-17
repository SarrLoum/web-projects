import { useState } from "react";
import { Year, Day, Month } from "./modalsWidget";

import { Apple, Backword, Close, Cube, Google } from "./myIcons";
import "./modals.css";

export const SignupForm = ({ isOpen, isClose }) => {
	const [Step, setNextStep] = useState(0);
	const [birthdate, setBirthdate] = useState("");
	const [userInfo, setUserInfo] = useState({
		username: "",
		email: "",
	});

	function displayNext() {
		setNextStep((prevState) => prevState + 1);
	}

	function displayPreview() {
		setNextStep((prevState) => prevState - 1);
	}

	function handleBirthDate(data) {
		setBirthdate(data);
	}

	function HandleUserInfo(event) {
		const { name, value } = event.target;
		setUserInfo((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	const { username, email } = userInfo;
	function renderStep() {
		switch (Step) {
			case 0:
				return <signupStep0 displayNext={displayNext} />;
			case 1:
				return (
					<signupStep1
						handleUser={HandleUserInfo}
						birthDate={handleBirthDate}
						displayNext={displayNext}
						onClose={isClose}
					/>
				);
			case 2:
				return (
					<signupStep2
						userName={username}
						userEmail={email}
						birthDate={birthdate}
						displayPreview={displayPreview}
						onClose={isClose}
					/>
				);
			default:
				return null;
		}
	}

	return (
		<div className={`modal ${isOpen ? "signup-modal" : ""}`}>
			<div className='modal-content'>{renderStep()}</div>
		</div>
	);
};

export const signupStep0 = ({ displayNext }) => {
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
				<div onClick={displayNext} className='next-btn stack-gap'>
					<p>Créer votre compte</p>
				</div>
			</div>
		</>
	);
};

export const signupStep1 = ({
	handleUser,
	birthDate,
	displayNext,
	onClose,
}) => {
	const [dates, setDates] = useState({
		month: "",
		day: "",
		year: "",
	});

	function handleDate(event) {
		const { name, value } = event.target;
		setDates((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	function sendDateToSignUp() {
		var { month, day, year } = dates;
		const birthdate = `${month} ${day}, ${year}`;
		const date = new Date(birthdate);
		const formattedDate = date.toLocaleDateString({
			month: "short",
			day: "numeric",
			year: "numeric",
		});
		console.log(formattedDate); // "Dec 23, 1999"

		birthDate(formattedDate);
	}

	function handleClick() {
		sendDateToSignUp();
		displayNext();
	}

	return (
		<>
			<div className='modal-header'>
				<Close closeModal={onClose} />
			</div>
			<div className='form-container'>
				<h1>Rejoignez nous sur Twitter</h1>
				<form>
					<div className='input-field'>
						<label htmlFor='username-input'>Email</label>
						<input
							name='username'
							id='username-input'
							type='text'
							onChange={handleUser}
						/>
					</div>

					<div className='input-field'>
						<label htmlFor='email-input'>Email</label>
						<input
							name='email'
							id='email-input'
							type='email'
							onChange={handleUser}
						/>
					</div>
					<div className='bitrhdate-container'>
						<h5>Date of birth</h5>
						<p>
							cette information ne sera pas affichée pubiquement. Confirmez
							votre âge, même si ce compte est pour une entreprise, un animal de
							compagnie ou autre chose
						</p>
						<div className='date-inputs'>
							<Month dateOnChange={handleDate} />
							<Day dateOnChange={handleDate} />
							<Year dateOnChange={handleDate} />
						</div>
					</div>
					<div className='modal-footer'>
						<input type='text' value='Next' onClick={handleClick} />
					</div>
				</form>
			</div>
		</>
	);
};

export const signupStep2 = ({
	userName,
	userEmail,
	birthDate,
	displayPreview,
}) => {
	const [passwords, setPasswords] = useState({
		password: "",
		confirmation: "",
	});

	function handlePassword(event) {
		const { name, value } = event.target;
		setPasswords((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	const data = { userName, userEmail, birthDate, ...passwords };

	function submitForm() {
		fetch("/SignUp", {
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
			<div className='login-header'>
				<Backword goToPreview={displayPreview} />
			</div>
			<div className='from-container'>
				<form>
					<div className='input-field'>
						<label htmlFor='username-input'>Email</label>
						<input
							name='username'
							id='username-input'
							type='text'
							value={userName}
						/>
					</div>

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
						<label htmlFor='birthdate-input'>Email</label>
						<input
							name='birthdate'
							id='birthdate-input'
							type='text'
							value={birthDate}
						/>
					</div>

					<div className='input-field'>
						<label htmlFor='password-input'>Password</label>
						<input
							name='password'
							id='password-input'
							type='password'
							onChange={handlePassword}
						/>
					</div>
					<div className='input-field'>
						<label htmlFor='confirmation-input'>Confirm Password</label>
						<input
							name='confirmation'
							id='confirmation-input'
							type='password'
							onChange={handlePassword}
						/>
					</div>
					<div className='modal-footer'>
						<input type='submit' value='Se connecter' onSubmit={submitForm} />
					</div>
				</form>
			</div>
		</>
	);
};
