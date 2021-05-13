import React from 'react';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import {useState} from 'react';

export default function ChatApp() {
	return (
		<div>

			<button onClick={() => firebase.auth().signOut()}>Sign Out</button>
		</div>
	);
}
