import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextLinkArea from "../../components/TextLinkArea";
import NotLink from "../../components/NotLink";

const Secret = () => {
	const router = useRouter();
	const [link, setLink] = useState(null);

	useEffect(async () => {
		if (!router.isReady) return;
		fetch("/api/getLink?" + "code=" + router.query.pid, {
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
		}).then((data) => {
			data.json().then((json) => {
				if (json.code != "404") {
					setLink(json);
					deleteLink(json.code);
				}
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
				"access-control-allow-origin": "*",
			},
			method: "DELETE",
		});
	};

	return (
		<>
			<div className="container text-center">
				<div>
					{link ? (
						<>
							<h2>Link id: {link.code}</h2>
							<TextLinkArea value={link.message} disabled={true}></TextLinkArea>
							<div>
								<p style={{ marginTop: "50px" }}>
									<b>This link is already burned!</b>
								</p>
							</div>
						</>
					) : (
						<NotLink></NotLink>
					)}
				</div>
				<div>
					<button
						onClick={() => (window.location = "/")}
						className="btn btn-link"
					>
						Create your own secure link!
					</button>
				</div>
			</div>
		</>
	);
};

export default Secret;
