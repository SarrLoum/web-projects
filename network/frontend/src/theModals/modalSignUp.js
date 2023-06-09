import { useState } from "react";
import { Year, Day, Month } from "../widgets/modalsWidget";

import { Apple, Backword, Close, Cube2, Google } from "../widgets/myIcons";
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
				return (
					<SignupStep0 displayNext={displayNext} onClose={isClose} />
				);
			case 1:
				return (
					<SignupStep1
						handleUser={HandleUserInfo}
						birthDate={handleBirthDate}
						displayNext={displayNext}
						onClose={isClose}
					/>
				);
			case 2:
				return (
					<SignupStep2
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
		<div className={`modal ${isOpen ? "open" : ""}`}>
			<div className="modal-content">{renderStep()}</div>
		</div>
	);
};

export const SignupStep0 = ({ displayNext, onClose }) => {
	return (
		<>
			<div className="modal-header">
				<Close closeModal={onClose} />
				<Cube2 />
			</div>
			<div className="modal-body">
				<h1>Connectez-vous à Twitter</h1>
				<div className="google-login stack-gap">
					<Google />
					<span>Se connecter avec google</span>
				</div>
				<div className="apple-login">
					<Apple /> <span>Se Connecter avec Apple</span>
				</div>
				<div className="else-break">
					<hr />
					<span>else</span>
					<hr />
				</div>
				<div onClick={displayNext} className="next-btn stack-gap">
					<p>Créer votre compte</p>
				</div>
			</div>
		</>
	);
};

export const SignupStep1 = ({
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
			<div className="modal-header">
				<Close closeModal={onClose} />
			</div>
			<div className="f-container">
				<h1>Rejoignez nous sur Twitter</h1>
				<div className="input-field">
					<label htmlFor="username-input">Username</label>
					<input
						name="username"
						id="username-input"
						type="text"
						onChange={handleUser}
					/>
				</div>

				<div className="input-field">
					<label htmlFor="email-input">Email</label>
					<input
						name="email"
						id="email-input"
						type="email"
						onChange={handleUser}
					/>
				</div>
				<div className="bitrhdate-container">
					<h5>Date of birth</h5>
					<p>
						cette information ne sera pas affichée pubiquement.
						Confirmez votre âge, même si ce compte est pour une
						entreprise, un animal de compagnie ou autre chose
					</p>
					<div className="date-inputs">
						<Month dateOnChange={handleDate} />
						<Day dateOnChange={handleDate} />
						<Year dateOnChange={handleDate} />
					</div>
				</div>
			</div>
			<div className="modal-footer lower-div">
				<input type="submit" value="Next" onClick={handleClick} />
			</div>
		</>
	);
};

export const SignupStep2 = ({
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

	const handleSignUp = async () => {
		let response = await fetch("https://localhost:8000/api/register/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const { token } = await response.json();
			localStorage.setItem("token", token);
		} else {
			alert("Encountering issues while signing up user try again");
		}
	};

	return (
		<>
			<div className="modal-header">
				<Backword goToPreview={displayPreview} />
			</div>
			<form>
				<div className="f-container">
					<div className="input-field">
						<label htmlFor="username-input">Usename</label>
						<input
							name="username"
							id="username-input"
							type="text"
							value={userName}
						/>
					</div>

					<div className="input-field">
						<label htmlFor="email-input">Email</label>
						<input
							name="email"
							id="email-input"
							type="email"
							value={userEmail}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="birthdate-input">Birth</label>
						<input
							name="birthdate"
							id="birthdate-input"
							type="text"
							value={birthDate}
						/>
					</div>

					<div className="input-field">
						<label htmlFor="password-input">Password</label>
						<input
							name="password"
							id="password-input"
							type="password"
							onChange={handlePassword}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="confirmation-input">
							Confirm Password
						</label>
						<input
							name="confirmation"
							id="confirmation-input"
							type="password"
							onChange={handlePassword}
						/>
					</div>
				</div>
				<div className="modal-footer">
					<input
						type="submit"
						value="Se connecter"
						onSubmit={handleSignUp}
					/>
				</div>
			</form>
		</>
	);
};

export const SignUpOptions = () => {
	return (
		<div className="options-container">
			<h1>Nouveau sur Twitter</h1>
			<p>Inscrivez-vous pour profiter de votre profil personnalisé!</p>
			<div className="option-btn google-option">
				<span>Se connecter avec google</span>
			</div>
			<div className="option-btn apple-option">
				<span>Se Connecter avec Apple</span>
			</div>
			<div className="option-btn create-option">
				<span>Créer votre compte</span>
			</div>
			<p>
				En vous inscrivant, vous acceptez les Conditions d’utilisation
				et la politique de confidentialité, notamment l’Utilisation des
				cookies
			</p>
		</div>
	);
};
