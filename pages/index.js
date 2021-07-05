import Head from "next/head";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import { getuuid } from "../utils/random";
import TextLinkArea from "../components/textLinkArea";
import { addLinkToCollection } from "../util/db";

export default function Home() {
	const [textLink, setTextLink] = useState();
	const [randomLink, setRandomLink] = useState("");

	const handleTextLink = (e) => {
		setTextLink(e.target.value);
	};

	const generateLink = async () => {
		const uuid = getuuid();
		setRandomLink(uuid.substr(0, 6));
		await addLinkToCollection({
			message: textLink,
			code: randomLink,
			entireLink: getURl(),
		});
		clearText();
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
			<Container className="p-3">
				<h1 className="header">Welcome to Secure Ioio Link</h1>
				<p>
					Share secure links to send data confidentially. The data will be
					erased after being read <b>one time</b>
				</p>
				<div>
					<TextLinkArea
						value={textLink}
						onChange={handleTextLink}
					></TextLinkArea>
				</div>
				<div>
					<Button onClick={generateLink} variant="primary">
						Generate link
					</Button>{" "}
					<Button onClick={clearText} variant="secondary">
						Clear text
					</Button>
				</div>
				<div style={{ marginTop: "20px" }}>
					{randomLink && (
						<>
							<b>
								{window.location.protocol}
								{"//"}
								{window.location.host}/secret/{randomLink}
							</b>
							<Button onClick={copyText} variant="link">
								Copy
							</Button>{" "}
							<Button variant="danger">Delete now!</Button>
						</>
					)}
				</div>
				<footer>Powered by github.com/ioiotinez</footer>
			</Container>
		</>
	);
}
