import firebase from 'firebase';
import React, { useState } from 'react';

export default function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signUpOpen, setSignUpOpen] = useState(false);

	const signUpWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	const signUpWithFacebook = () => {
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	const signUpWithMail = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};

	return (
		<div>
			<button onClick={signUpWithGoogle}>Sign in Using Google</button>
			<button onClick={signUpWithFacebook}>Sign in Using Facebook</button>
			<div
				className="dont-have"
				onClick={() => setSignUpOpen(!signUpOpen)}
			>
				Don't have a user yet?
			</div>
			{signUpOpen ? (
				<>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						required
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						required
					/>
					<button onClick={signUpWithMail}>Signup</button>
				</>
			) : null}
		</div>
	);
}
