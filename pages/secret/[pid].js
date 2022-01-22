import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TextLinkArea from "../../components/TextLinkArea";
import NotLink from "../../components/NotLink";
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
			<div className="container bg-gray-200 min-h-screen m-auto min-w-full">
				<div className="flex flex-col flex-wrap justify-center place-content-center">
					<div className="p-10 text-center">
						<h1 className="text-4xl">Welcome to Secure Ioio Link</h1>
						<p className="mt-2">
							Share secure links to send data confidentially.
						</p>
						<p className="mt-2">
							Data will be erased after being read <b>one time</b>
						</p>
					</div>
					<div className="bg-white p-10 h-screen xl:w-3/5 lg:w-3/5 w-screen md:w-3/4 text-center shadow-lg rounded m-auto">
						{link ? (
							<div className="flex flex-col place-content-center md:w-full">
								<h2 className="mb-4">Link id: {router.query.pid}</h2>
								<TextLinkArea
									value={link.message}
									disabled={true}
								></TextLinkArea>
								<div>
									<p className="text-red-700 mt-4">
										<b>This link is already burned!</b>
									</p>
								</div>
							</div>
						) : null}
						{showNotExist ? <NotLink></NotLink> : null}

						<div>
							{showNewLink && (
								<>
									<button
										onClick={() => (window.location = "/")}
										className="p-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Create your own secure link!
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Secret;
