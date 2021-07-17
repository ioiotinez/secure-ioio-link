import { deleteLinkFromCollection } from "../../util/db";

export default async function handler(req, res) {
	if (req.method !== "DELETE") {
		res.status(400).send({ message: "Only POST requests allowed" });
		return;
	}

	const params = req.body;

	await deleteLinkFromCollection(params);

	res.status(200).json({ result: "OK" });
}
