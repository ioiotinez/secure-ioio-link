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
			<div>
				{!deleted ? (
					<>
						<h4>{entireLink}</h4>
						<div>
							<button
								className="p-2 rounded border-2 bg-blue-200 mt-4"
								onClick={copyLink}
							>
								Copy
							</button>
							<button
								className="p-2 rounded border-2 bg-red-800 mt-4 text-white"
								onClick={deleteLink}
							>
								Delete!
							</button>
						</div>
					</>
				) : (
					<>
						<h4>{`Link id ${randomLink} was delete!`}</h4>
					</>
				)}
			</div>
		</>
	);
}

export default GenerateLink;
