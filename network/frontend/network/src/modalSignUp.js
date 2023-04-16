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
		<div className={`Login-container ${isOpen ? "open-signup" : ""}`}>
			{renderStep()}
		</div>
	);
};

export const signupStep0 = ({ displayNext }) => {
	return (
		<>
			<div className='login-header'>
				<Close closeModal={onClose} />
				<Cube />
			</div>
			<div className='login-type'>
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
					<p>Suivant</p>
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
			<div className='login-header'>
				<Close closeModal={onClose} />
			</div>
			<div className='form-container'>
				<form className='login-form'>
					<div className='username-container'>
						<label htmlFor='username-input'>Email</label>
						<input
							name='username'
							id='username-input'
							type='text'
							onChange={handleUser}
						/>
					</div>

					<div className='email-container'>
						<label htmlFor='email-input'>Email</label>
						<input
							name='email'
							id='email-input'
							type='email'
							onChange={handleUser}
						/>
					</div>
					<div className='birthdate-container'>
						<Month dateOnChange={handleDate} />
						<Day dateOnChange={handleDate} />
						<Year dateOnChange={handleDate} />
					</div>

					<input
						className='step-btn'
						type='text'
						value='Next'
						onClick={handleClick}
					/>
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
			<div>
				<form className='login-form'>
					<div className='username-container'>
						<label htmlFor='username-input'>Email</label>
						<input
							name='username'
							id='username-input'
							type='text'
							value={userName}
						/>
					</div>

					<div className='email-container'>
						<label htmlFor='email-input'>Email</label>
						<input
							name='email'
							id='email-input'
							type='email'
							value={userEmail}
						/>
					</div>
					<div className='birthdate-container'>
						<label htmlFor='birthdate-input'>Email</label>
						<input
							name='birthdate'
							id='birthdate-input'
							type='text'
							value={birthDate}
						/>
					</div>

					<div className='password-container'>
						<label htmlFor='password-input'>Password</label>
						<input
							name='password'
							id='password-input'
							type='password'
							onChange={handlePassword}
						/>
					</div>
					<div className='confirmation-container'>
						<label htmlFor='confirmation-input'>Confirm Password</label>
						<input
							name='confirmation'
							id='confirmation-input'
							type='password'
							onChange={handlePassword}
						/>
					</div>
					<input
						className='step-btn'
						type='submit'
						value='Se connecter'
						onSubmit={submitForm}
					/>
				</form>
			</div>
		</>
	);
};
