import firebase from 'firebase';
import React from 'react';

export default function Signup() {
	const signUpWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	const signUpWithFacebook = () => {
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider);
	};

	return (
		<div>
			<div>Don't have a user yet?</div>
			<div>Sign up here</div>
			<button onClick={signUpWithGoogle}>Sign in Using Google</button>
			<button onClick={signUpWithFacebook}>Sign in Using Facebook</button>
		</div>
	);
}
