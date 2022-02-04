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
		setDeleted(true);
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
	};

	return (
		<>
			<div>
				{!deleted ? (
					<div className="m-3 rounded-lg shadow-md">
						<div className="m-3">
							<div className="underline">
								<input
									className="bg-blue-200 font-normal p-1 rounded border-2 border-black"
									value={entireLink}
									disabled
								/>
								<button
									className="ml-2 text-sm p-2 rounded border-2 bg-blue-200 mt-4 hover:font-black focus:ring focus:ring-blue-300"
									onClick={copyLink}
								>
									Copy
								</button>
							</div>
						</div>
						<div>
							<button
								className="p-2 rounded border-2 bg-red-800 mt-4 mb-4 text-white hover:bg-white hover:text-red-800 focus:ring-black"
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
