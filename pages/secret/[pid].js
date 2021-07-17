import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextLinkArea from "../../components/textLinkArea";

const Secret = () => {
	const router = useRouter();
	const [link, setLink] = useState(null);

	useEffect(async () => {
		if (!router.isReady) return;
		fetch("/api/getLink?" + "code=" + router.query.pid).then((data) => {
			data.json().then((json) => {
				console.log(json);
				if (json.code !== 404) {
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
			},
			method: "DELETE",
		});
	};

	return (
		<>
			<div className="card">
				{link ? (
					<TextLinkArea value={link.message}></TextLinkArea>
				) : (
					<p>No existe el link</p>
				)}
			</div>
		</>
	);
};

export default Secret;
