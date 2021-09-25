import { useState } from "react";

const SecretKey = () => {
	const [showMoreOptions, setShowMoreOptions] = useState();
	const [textButton, setTextButton] = useState("More options");

	const handleMoreOptions = () => {
		if (!showMoreOptions) {
			setTextButton("Close options");
		} else {
			setTextButton("More options");
		}
		setShowMoreOptions(!showMoreOptions);
	};

	return (
		<>
			<div>
				<button onClick={handleMoreOptions} className="btn btn-secondary">
					{textButton}
				</button>
			</div>
			{showMoreOptions && (
				<div style={{ textAlign: "center", maxWidth: "600px" }}>
					<div className="form-group">
						<label htmlFor="secretKey">Password: </label>
						<input
							id="secretKey"
							type="password"
							className="form-control"
						></input>
					</div>
					<div className="form-group">
						<label htmlFor="confirmSecretKey">Confirm password: </label>
						<input
							id="confirmSecretKey"
							type="password"
							className="form-control"
						></input>
					</div>
				</div>
			)}
		</>
	);
};

export default SecretKey;
