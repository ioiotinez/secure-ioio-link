import styles from "./GenerateLink.module.css";
import { useState } from "react";

function GenerateLink({ randomLink }) {
	const [deleted, setDeleted] = useState();

	const entireLink =
		window.location.protocol +
		"//" +
		window.location.host +
		"/secret/" +
		randomLink;

	const copyLink = () => {
		navigator.clipboard.writeText(entireLink);
	};

	const deleteLink = async () => {
		await fetch("/api/deleteLink?", {
			body: JSON.stringify({
				code: randomLink,
			}),
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
			method: "DELETE",
		});
		setDeleted(true);
	};

	return (
		<>
			<div className={styles.box}>
				{!deleted ? (
					<>
						<h4>{entireLink}</h4>
						<div>
							<button className="btn" onClick={copyLink}>
								Copy
							</button>
							<button onClick={deleteLink} className="btn danger">
								Delete!
							</button>
						</div>
					</>
				) : (
					<>
						<h4
							className={styles.alert}
						>{`Link id ${randomLink} was delete!`}</h4>
					</>
				)}
			</div>
		</>
	);
}

export default GenerateLink;
