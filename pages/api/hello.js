// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(_, res) {
	res.status(200).json({ name: "John Does" });
}