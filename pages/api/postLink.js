import CryptoJS from "crypto-js";
import { firestore } from "../../util/firebase";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(400).send({ message: "Only POST requests allowed" });
		return;
	}

	let params = req.body;

	params.message = CryptoJS.AES.encrypt(
		params.message,
		process.env.NEXT_PUBLIC_keyAes
	).toString();

	firestore
		.collection("links")
		.doc(params.code)
		.set({
			message: params.message,
			entireLink: params.entireLink,
		})
		.then(res.status(200).json({ errorId: "0" }));
}
