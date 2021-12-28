import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

const exePath =
	process.platform === "win32"
		? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
		: process.platform === "linux"
		? "/usr/bin/google-chrome"
		: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function getOptions(isDev: boolean) {
	let options;
	if (isDev) {
		options = {
			args: [],
			executablePath: exePath,
			headless: true,
		};
	} else {
		options = {
			args: [...chrome.args, "--font-render-hinting=none"],
			executablePath: await chrome.executablePath,
			headless: chrome.headless,
		};
	}
	return options;
}

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

	const options = await getOptions(process.env.NODE_ENV === "development");
	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle0" });
	const pdf = await page.pdf();
	await browser.close();
	res.setHeader("Content-Type", "application/pdf");
	res.send(pdf);
}
