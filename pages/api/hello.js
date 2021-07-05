// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const firestore = require("../../util/db");

export default function handler(_, res) {
	console.log(process.env.TEST);
	firestore.addCollection();
	res.status(200).json({ name: "John Does" });
}
