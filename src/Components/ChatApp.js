import React from 'react';
import firebase from 'firebase';

export default function ChatApp() {
	return (
		<div>
			<button onClick={() => firebase.auth().signOut()}>Sign Out</button>
		</div>
	);
}
