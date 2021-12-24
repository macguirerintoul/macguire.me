import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const domain: string =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/"
			: "https://macguire.me/";
	const resumePath = "utility/resume";
	const url = domain + resumePath;

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle0" });
	const pdf = await page.pdf();
	await browser.close();
	res.setHeader("Content-Type", "application/pdf");
	res.send(pdf);
}
