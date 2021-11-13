import { useEffect, useState } from "react";
import classes from "./SecretKey.module.css";

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
			<button
				onClick={handleMoreOptions}
				className="btn btn-secondary"
				style={{ marginTop: "10px" }}
			>
				{textButton}
			</button>
			{showMoreOptions && (
				<div
					className={classes.passwordContainer}
					style={{
						margin: "0 auto",
						width: "60%",
						left: "50%",
						maxWidth: "300px",
					}}
				>
					<div>
						<label htmlFor="secretKey">Password: </label>
						<br />
						<input
							id="secretKey"
							type="password"
							className={classes.inputPassword}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					<div>
						<label htmlFor="confirmSecretKey">Confirm password: </label>
						<br />
						<input
							id="confirmSecretKey"
							type="password"
							className={classes.inputPassword}
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
