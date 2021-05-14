import React, { useState } from 'react';
import firebase from 'firebase';
import FormDialog from './FormDialog';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function ChatApp() {
	const firestore = firebase.firestore();
	const chatRef = firestore.collection('chatrooms');
	// const [chatrooms, setChatrooms] = useState([]);
	// chatRef
	// 	.get()
	// 	.then((res) => res.forEach((chatroom) => console.log(chatroom.data)));

	chatRef.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			doc.data();
		});
	});

	const addHandler = () => {};
	return (
		<div>
			<FormDialog />
			<button onClick={addHandler}>Add chatroom</button>
			<button onClick={() => firebase.auth().signOut()}>Sign Out</button>
		</div>
	);
}
