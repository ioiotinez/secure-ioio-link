import { useEffect, useState } from "react";

const SecretKey = ({ setValid, useSecretKey, secretKeyResult }) => {
	const [showMoreOptions, setShowMoreOptions] = useState();
	const [textButton, setTextButton] = useState("More options");
	const [password, setPassword] = useState();
	const [repeatPassword, setRepeatPassword] = useState();

	const handleMoreOptions = () => {
		if (!showMoreOptions) {
			setTextButton("Close options");
			useSecretKey(true);
		} else {
			setTextButton("More options");
		}
		setShowMoreOptions(!showMoreOptions);
	};

	useEffect(() => {
		setValid(password === repeatPassword);
		if (password === repeatPassword) {
			secretKeyResult(password);
		}
	}, [password, repeatPassword]);

	return (
		<>
			<button onClick={handleMoreOptions} className="btn btn-secondary">
				{textButton}
			</button>
			{showMoreOptions && (
				<div
					className="container"
					style={{
						margin: "0 auto",
						width: "60%",
						left: "50%",
						maxWidth: "300px",
					}}
				>
					<div className="form-group">
						<label htmlFor="secretKey">Password: </label>
						<input
							id="secretKey"
							type="password"
							className="form-control"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					<div className="form-group">
						<label htmlFor="confirmSecretKey">Confirm password: </label>
						<input
							id="confirmSecretKey"
							type="password"
							className="form-control"
							value={repeatPassword}
							onChange={(e) => setRepeatPassword(e.target.value)}
						></input>
					</div>
					{password && repeatPassword && password !== repeatPassword && (
						<label style={{ color: "red" }}>Password does not match</label>
					)}
				</div>
			)}
		</>
	);
};

export default SecretKey;
