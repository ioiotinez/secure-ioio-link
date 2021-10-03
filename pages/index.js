import Head from "next/head";
import { useState } from "react";
import { getuuid } from "../utils/random";
import TextLinkArea from "../components/TextLinkArea";
import SecretKey from "../components/SecretKey";

export default function Home() {
	const [textLink, setTextLink] = useState();
	const [randomLink, setRandomLink] = useState("");
	const [canGenerate, setCanGenerate] = useState();
	const [useSecretKey, setUseSecretKey] = useState();
	const [password, setPassword] = useState();

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
				password: useSecretKey ? password : null,
			}),
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
			method: "POST",
		});

		clearText();
	};

	const deleteNow = async () => {
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

		setRandomLink("");
	};

	const clearText = () => {
		setTextLink("");
		setPassword();
	};

	const copyText = () => {
		navigator.clipboard.writeText(getURl());
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

	const setValid = (value) => {
		setCanGenerate(value);
	};

	return (
		<>
			<Head>
				<title>Secure IoioLink</title>
				<meta name="description" content="Generated secure links" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div>
				<div className="px-4 pt-5 my-5 text-center">
					<h1 className="header">Welcome to Secure Ioio Link</h1>
					<p>
						Share secure links to send data confidentially. Data will be erased
						after being read <b>one time</b>
					</p>
					<div>
						<div>
							<div>
								<TextLinkArea
									value={textLink}
									onChange={handleTextLink}
									placeholder={"Write your text here"}
								></TextLinkArea>
							</div>
							<div>
								<SecretKey
									setValid={setValid}
									useSecretKey={setUseSecretKey}
									secretKeyResult={setPassword}
								/>
							</div>
							<div style={{ marginTop: "10px" }}>
								<button
									className="btn btn-primary"
									onClick={generateLink}
									variant="primary"
									disabled={!canGenerate}
								>
									Generate link
								</button>{" "}
								<button
									className="btn btn-secondary"
									onClick={clearText}
									variant="secondary"
								>
									Clear text
								</button>
							</div>
							<div style={{ marginTop: "20px" }}>
								{randomLink && (
									<>
										<b>
											{window.location.protocol}
											{"//"}
											{window.location.host}/secret/{randomLink}
										</b>
										<div>
											<button
												className="btn btn-link"
												onClick={copyText}
												variant="link"
											>
												Copy
											</button>
										</div>

										<button className="btn btn-danger" onClick={deleteNow}>
											Delete now!
										</button>
									</>
								)}
							</div>
						</div>
					</div>
					<footer style={{ marginTop: "50px" }}>
						Powered by github.com/ioiotinez
					</footer>
				</div>
			</div>
		</>
	);
}
//
