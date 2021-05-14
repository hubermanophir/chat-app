import React, { useState } from 'react';
import firebase from 'firebase';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signIn = (e) => {
		e.preventDefault();
		console.log(email, password);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user;
				console.log(user);
			})
			.catch((err) => {
				console.log('invalid');
			});
	};

	return (
		<div>
			<h1>Chat App</h1>
			<div>Login here</div>
			<div>
				<form>
					<input
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						required
						placeholder="email"
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						required
						placeholder="password"
					/>
					<button onClick={signIn}>Login</button>
				</form>
			</div>
		</div>
	);
}
