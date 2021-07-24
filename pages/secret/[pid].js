import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextLinkArea from "../../components/TextLinkArea";
import NotLink from "../../components/NotLink";

const Secret = () => {
	const router = useRouter();
	const [link, setLink] = useState();
	const [showNotExist, setShowNotExists] = useState(false);
	const [showNewLink, setShowNewLink] = useState(false);

	useEffect(async () => {
		console.log("Paso");
		if (!router.isReady) return;
		fetch("/api/getLink?" + "code=" + router.query.pid, {
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
		}).then((data) => {
			data.json().then((json) => {
				if (json.error === undefined) {
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

	return (
		<>
			<div className="px-4 pt-5 my-5 text-center">
				<div>
					{link ? (
						<>
							<h2>Link id: {router.query.pid}</h2>
							<TextLinkArea value={link.message} disabled={true}></TextLinkArea>
							<div>
								<p style={{ marginTop: "40px" }}>
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
			</div>
		</>
	);
};

export default Secret;
