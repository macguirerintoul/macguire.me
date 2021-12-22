import { NextApiRequest, NextApiResponse } from 'next'
const puppeteer = require('puppeteer')
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage(); 
  const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/resume" : "https://macguire.me/resume"
  await page.goto(url, { waitUntil: "networkidle0" }); 
  const pdf = await page.pdf(); 
  await browser.close(); 
  res.setHeader( 'Content-Type', 'application/pdf')
	res.send(pdf)
}