import CryptoJS from "crypto-js";
import { firestore } from "../../util/firebase";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}

	console.log(process.env.NEXT_PUBLIC_keyAes);

	firestore
		.collection("links")
		.doc(req.query.code)
		.get()
		.then((data) => {
			let infoLink = data.data();
			if (infoLink !== null) {
				infoLink.message = CryptoJS.AES.decrypt(
					infoLink.message,
					process.env.NEXT_PUBLIC_keyAes
				).toString(CryptoJS.enc.Utf8);
				res.status(200).json(infoLink);
			} else {
				res
					.status(404)
					.json({ error: 404, errorMessage: "Not link info found" });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
}
