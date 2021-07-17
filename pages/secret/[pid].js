import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Secret = () => {
	const router = useRouter();
	const [link, setLink] = useState();

	useEffect(async () => {
		if (!router.isReady) return;
		fetch("/api/getLink?" + "code=" + router.query.pid).then((data) => {
			console.log(data);
			data.json().then((json) => {
				console.log(json);
				setLink(json);
			});
		});
	}, [router.isReady]);

	return (
		<>
			<div className="card">
				<div>{link ? <p>{link.message}</p> : ""}</div>
				<div>{link ? <p>{link.code}</p> : ""}</div>
			</div>
		</>
	);
};

export default Secret;
