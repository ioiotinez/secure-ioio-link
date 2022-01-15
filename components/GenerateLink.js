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
					<div className="m-3 rounded-lg shadow-md">
						<div className="m-3">
							<div className="underline">
								{entireLink}
								<button
									className="ml-2 text-sm p-2 rounded border-2 bg-blue-200 mt-4"
									onClick={copyLink}
								>
									Copy
								</button>
							</div>
						</div>
						<div>
							<button
								className="p-2 rounded border-2 bg-red-800 mt-4 mb-4 text-white"
								onClick={deleteLink}
							>
								Delete!
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="m-4 text-red-700 font-bold text-lg">{`Link id ${randomLink} was delete!`}</div>
					</>
				)}
			</div>
		</>
	);
}

export default GenerateLink;
