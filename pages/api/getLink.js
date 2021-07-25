import CryptoJS from "crypto-js";
import { firestore } from "../../util/firebase";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}

	const infoLink = await getLinkToFirebase(req.query.code, 1);
	res.status(infoLink.errorCode).json(infoLink);
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getLinkToFirebase = async (code, attemps) => {
	try {
		const data = await firestore.collection("links").doc(code).get();

		let infoLink = data.data();
		if (infoLink === undefined) {
			if (attemps > 0) {
				await delay(500);
				return await getLinkToFirebase(code, attemps - 1);
			} else {
				return { errorCode: 404 };
			}
		} else {
			infoLink.message = CryptoJS.AES.decrypt(
				infoLink.message,
				process.env.NEXT_PUBLIC_keyAes
			).toString(CryptoJS.enc.Utf8);
			infoLink.errorCode = 200;

			return infoLink;
		}
	} catch (err) {
		return { errorCode: 500 };
	}
};
