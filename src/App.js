import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatApp from './Components/ChatApp';
import Login from './Components/Login';
import Signup from './Components/Signup';

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

function App() {
	const [user] = useAuthState(auth);
	return (
		<div className="App">
			{user ? (
				<ChatApp />
			) : (
				<>
					<Login />
					<Signup />
				</>
			)}
		</div>
	);
}

export default App;
