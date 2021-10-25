import Head from "next/head";
import { useState } from "react";
import { getuuid } from "../utils/random";
import TextLinkArea from "../components/TextLinkArea";
import Layout from "../components/Layout";
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
			<Layout>
				<div>
					<h1>Welcome to Secure Ioio Link</h1>
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
							<div style={{ marginTop: "10px" }}>
								<button
									className="btn"
									onClick={generateLink}
									variant="primary"
								>
									Generate link
								</button>{" "}
								<button
									className="btn secondary"
									onClick={clearText}
									variant="secondary"
								>
									Clear text
								</button>
							</div>
							<div style={{ marginTop: "20px" }}>
								{randomLink && (
									<>
										<GenerateLink randomLink={randomLink} />
									</>
								)}
							</div>
						</div>
					</div>
					<footer style={{ marginTop: "50px" }}>
						<small>Powered by github.com/ioiotinez</small>
					</footer>
				</div>
			</Layout>
		</>
	);
}
//
