import { addLinkToCollection } from "../../util/db";
import CryptoJS from "crypto-js";

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

	await addLinkToCollection(params);
}
