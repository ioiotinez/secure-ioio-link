import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextLinkArea from "../../components/TextLinkArea";
import NotLink from "../../components/NotLink";
import Layout from "../../components/Layout";
import Head from "next/head";

const Secret = () => {
	const router = useRouter();
	const [link, setLink] = useState();
	const [showNotExist, setShowNotExists] = useState(false);
	const [showNewLink, setShowNewLink] = useState(false);

	useEffect(async () => {
		if (!router.isReady) return;
		fetch("/api/getLink?" + "code=" + router.query.pid, {
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
		}).then((data) => {
			data.json().then((json) => {
				if (json.errorCode === 200) {
					setLink(json);
					deleteLink(router.query.pid);
				} else {
					setShowNotExists(true);
				}
				setShowNewLink(true);
			});
		});
	}, [router.isReady]);

	const deleteLink = async (code) => {
		fetch("/api/deleteLink?", {
			body: JSON.stringify({
				code: code,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "DELETE",
		});
	};

	if (!router.isReady || (!link && !showNotExist)) {
		return <></>;
	}

	return (
		<>
			<Head>
				<title>Secure IoioLink</title>
			</Head>
			<Layout>
				<div>
					{link ? (
						<>
							<h2>Link id: {router.query.pid}</h2>
							<TextLinkArea value={link.message} disabled={true}></TextLinkArea>
							<div>
								<p className="danger" style={{ marginTop: "40px" }}>
									<b>This link is already burned!</b>
								</p>
							</div>
						</>
					) : null}
					{showNotExist ? <NotLink></NotLink> : null}
				</div>
				<div>
					{showNewLink && (
						<>
							<button
								onClick={() => (window.location = "/")}
								className="btn btn-link"
							>
								Create your own secure link!
							</button>
						</>
					)}
				</div>
			</Layout>
		</>
	);
};

export default Secret;
