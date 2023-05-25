import type { NextApiRequest, NextApiResponse } from "next";
import { getLatestCommit } from "../../lib/utilities";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const commit = await getLatestCommit();
	res.setHeader("Cache-Control", "s-maxage=86400");
	console.log("commit", commit);
	res.json(commit);
}
