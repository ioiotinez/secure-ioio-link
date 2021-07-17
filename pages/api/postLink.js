import { addLinkToCollection } from "../../util/db";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		res.status(400).send({ message: "Only POST requests allowed" });
		return;
	}

	const params = req.body;
	await addLinkToCollection(params);
}
