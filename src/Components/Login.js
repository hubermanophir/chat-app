import React from 'react';

export default function Login() {
	return (
		<div>
			<h1>Chat App</h1>
			<div>Login here</div>
			<form>
				<input type="email" required />
				<input type="password" required />
				<input type="submit" />
			</form>
		</div>
	);
}
