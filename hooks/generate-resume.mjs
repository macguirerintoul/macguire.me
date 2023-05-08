import puppeteer from "puppeteer";

async function generate() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("http://localhost:3000/utility/resume", {
		waitUntil: "networkidle0",
	});
	await page.pdf({ path: "./public/Macguire Rintoul - Resume.pdf" });
	await browser.close();
}

generate();
