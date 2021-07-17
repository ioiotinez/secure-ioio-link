import { getLink } from "../../util/db";

export default async function handler(req, res) {
	if (req.method !== "GET") {
		res.status(400).send({ message: "Only GET requests allowed" });
		return;
	}
	const data = await getLink(req.query.code);
	if (data !== null) {
		res.status(200).json(data);
	} else {
		res.status(404).json({ code: 404, errorMessage: "Not link info found" });
	}
}
