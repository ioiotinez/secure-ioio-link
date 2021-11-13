const LoginComponent = () => {
	return (
		<div className="login-component">
			<h1>Login</h1>
			<form>
				<label>Username</label>
				<input type="text" />
				<label>Password</label>
				<input type="password" />
				<button>Login</button>
			</form>
		</div>
	);
};

export default LoginComponent;
