import React from 'react';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import FormDialog from './FormDialog';

export default function ChatApp() {
	const addHandler = () => {};
	return (
		<div>
			<FormDialog />
			<button onClick={addHandler}>Add chatroom</button>
			<button onClick={() => firebase.auth().signOut()}>Sign Out</button>
		</div>
	);
}
