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

	if (params.password) {
		params.password = CryptoJS.AES.encrypt(
			params.password,
			process.env.NEXT_PUBLIC_keyAes
		).toString();
	}

	firestore
		.collection("links")
		.doc(params.code)
		.set({
			message: params.message,
			date: new Date().toGMTString(),
			pass: params.password,
		})
		.then(res.status(200).json({ errorId: "0" }));
}
