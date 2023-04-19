import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import TimeLine from "./timeLine";
import Suggestions from "./suggest";
import { LoginForm } from "./modalLogIn";
import { SignupForm } from "./modalSignUp";
import "./App.css";

function App() {
	const [isAuthentifated, setIsAuthentificated] = useState(false);
	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setIsAuthentificated(true);
		}
	}, []);

	const [modals, setModals] = useState({
		signIN: false,
		signUP: false,
	});

	function openModal(event) {
		const { name } = event.target;
		setModals((prevState) => ({
			...prevState,
			[name]: true,
		}));
	}

	function closeModal(event) {
		const { name } = event.target;
		setModals((prevState) => ({
			...prevState,
			[name]: false,
		}));
	}

	const { signUP, signIN } = modals;
	return (
		<div className='App-container'>
			<Sidebar />
			<TimeLine />
			<Suggestions />

			{isAuthentifated ? (
				""
			) : (
				<div className='bottom-signal'>
					<div className='invite-signal'>
						<h6>Don't miss on what's hapenning.</h6>
						<p>Twitter users are the first to know.</p>
					</div>
					<div className='auth-buttons'>
						<button onClick={openModal} name='signIn' className='Sign-in'>
							<span>Sign in</span>
						</button>
						<button onClick={openModal} name='signUp' className='Sign-up'>
							<span>Sign up</span>
						</button>
					</div>
					<LoginForm isOpen={signIN} isClose={closeModal} />
					<SignupForm isOpen={signUP} isClose={closeModal} />
				</div>
			)}
		</div>
	);
}

export default App;
