import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { getuuid } from "../utils/random";
import TextLinkArea from "../components/textLinkArea";

export default function Home() {
	const [textLink, setTextLink] = useState();
	const [randomLink, setRandomLink] = useState("");

	const handleTextLink = (e) => {
		setTextLink(e.target.value);
	};

	const generateLink = (e) => {
		const uuid = getuuid();
		setRandomLink(uuid.substr(0, 6));
	};

	const clearText = () => {
		location.reload();
	};

	const copyText = () => {
		const text =
			window.location.protocol +
			"//" +
			window.location.host +
			"/secret/" +
			randomLink;
		navigator.clipboard.writeText(text);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Secure IoioLink</title>
				<meta name="description" content="Generated secure links" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h3 className={styles.title}>Welcome to Secure Ioio Link</h3>
				<p className={styles.description}>
					Share secure links to send data confidentially. The data will be
					erased after being read <b>one time</b>
				</p>
				<div>
					<TextLinkArea onChange={handleTextLink}></TextLinkArea>
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
			</main>

			<footer className={styles.footer}>Powered by github.com/ioiotinez</footer>
		</div>
	);
}
