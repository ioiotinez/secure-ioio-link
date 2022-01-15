import Head from "next/head";
import { useState } from "react";
import { getuuid } from "../utils/random";
import TextLinkArea from "../components/TextLinkArea";
import GenerateLink from "../components/GenerateLink";

export default function Home() {
	const [textLink, setTextLink] = useState();
	const [randomLink, setRandomLink] = useState("");

	const handleTextLink = (e) => {
		setTextLink(e.target.value);
	};

	const generateLink = async () => {
		setRandomLink("");
		const uuid = await getuuid();
		const link = uuid.substr(0, 6);
		setRandomLink(link);
		fetch("/api/postLink", {
			body: JSON.stringify({
				message: textLink,
				code: link,
				entireLink: getURl(),
			}),
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
			method: "POST",
		});

		clearText();
	};

	const clearText = () => {
		setTextLink("");
	};

	const getURl = () => {
		const text =
			window.location.protocol +
			"//" +
			window.location.host +
			"/secret/" +
			randomLink;
		return text;
	};

	return (
		<>
			<Head>
				<title>Secure IoioLink</title>
				<meta name="description" content="Generated secure links" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container bg-gray-200 min-h-screen m-auto min-w-full">
				<div className="flex flex-col flex-wrap justify-center place-content-center">
					<div className="p-10 text-center">
						<h1 className="text-4xl">Welcome to Secure Ioio Link</h1>
						<p className="mt-2">
							Share secure links to send data confidentially.
						</p>
						<p className="mt-2">
							Data will be erased after being read <b>one time</b>
						</p>
					</div>

					<div className="bg-white p-20 h-screen w-3/6 text-center shadow-lg rounded m-auto">
						<div>
							<div>
								<TextLinkArea
									value={textLink}
									onChange={handleTextLink}
									placeholder={"Write your text here"}
								></TextLinkArea>
							</div>
							<div>
								<button
									className="p-4 mt-4 bg-blue-500 text-white rounded"
									onClick={generateLink}
									variant="primary"
								>
									Generate link
								</button>{" "}
								<button
									className="p-4 mt-4 bg-gray-500 text-white rounded"
									onClick={clearText}
									variant="secondary"
								>
									Clear text
								</button>
							</div>
							<div>
								{randomLink && (
									<>
										<GenerateLink randomLink={randomLink} />
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
//
