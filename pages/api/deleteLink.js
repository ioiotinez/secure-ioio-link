import { firestore } from "../../util/firebase";

export default async function handler(req, res) {
	if (req.method !== "DELETE") {
		res.status(400).send({ message: "Only POST requests allowed" });
		return;
	}

	const params = req.body;

	firestore
		.collection("links")
		.doc(params.code)
		.delete()
		.then(() => res.status(200).json({ result: "ok" }))
		.catch((err) => res.status(500).json({ error: err }));
}
