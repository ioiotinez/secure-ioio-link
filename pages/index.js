import Head from "next/head";
import { useState } from "react";
import { getuuid } from "../utils/random";
import TextLinkArea from "../components/TextLinkArea";

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

	return (
		<>
			<Head>
				<title>Secure IoioLink</title>
				<meta name="description" content="Generated secure links" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="wrapper">
				<div id="formContent">
					<h1 className="header">Welcome to Secure Ioio Link</h1>
					<p>
						Share secure links to send data confidentially. Data will be erased
						after being read <b>one time</b>
					</p>
					<div>
						<div>
							<TextLinkArea
								value={textLink}
								onChange={handleTextLink}
							></TextLinkArea>
						</div>
						<div>
							<button
								className="btn btn-primary"
								onClick={generateLink}
								variant="primary"
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
									<button
										className="btn btn-link"
										onClick={copyText}
										variant="link"
									>
										Copy
									</button>
									<span></span>
									<button className="btn btn-link" onClick={deleteNow}>
										Delete now!
									</button>
								</>
							)}
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
