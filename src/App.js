import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatApp from './Components/ChatApp';
import Signup from './Components/Signup';
import style from './App.css';
import { useEffect, useState } from 'react';
import Login from './Components/Login';

firebase.initializeApp({
	apiKey: 'AIzaSyCY9-1IVkhI1xoDTI0Bx5xKv_wLBQ6Zo-w',
	authDomain: 'chat-app-f1845.firebaseapp.com',
	projectId: 'chat-app-f1845',
	storageBucket: 'chat-app-f1845.appspot.com',
	messagingSenderId: '186431588201',
	appId: '1:186431588201:web:85577adcf07d98ac0c5ff8',
	measurementId: 'G-5FZ6RYLR8G',
});
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

const usersRef = firestore.collection('users');

function App() {
	const [user] = useAuthState(auth);
	const [username, setUsername] = useState();

	function saveUserToFirestore(image_url) {
		usersRef
			.add({
				user_UID: user.uid,
				user_image: image_url,
				username: username,
			})
			.then((response) => {
				console.log('added success');
				console.log(response);
			})
			.catch((err) => {
				console.log('didnt add');
				console.log(err.message);
			});
	}

	function uploadImage() {
		if (user) {
			storage
				.ref(`user_images/${user.uid}.png`)
				.getDownloadURL()
				.then((res) => {
					console.log(res);
				})
				.catch((err) => {});
		}
	}
	uploadImage();
	useEffect(() => {
		if (user) {
			storage
				.ref(`user_images/${user.uid}.png`)
				.getDownloadURL()
				.then((res) => {
					saveUserToFirestore(res);
					// console.log(res);
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}, [user]);

	if (user) {
		console.log(user);
	}

	return (
		<div className="App">
			{user ? (
				<ChatApp user={user} />
			) : (
				<>
					<Login />
					<Signup
						user={user}
						username={username}
						setUsername={setUsername}
					/>
				</>
			)}
		</div>
	);
}

export default App;
