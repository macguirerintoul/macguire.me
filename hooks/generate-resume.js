const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs");
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";

const file = fs.createWriteStream("./public/Macguire Rintoul - Resume.pdf");
const request = http.get(
	"http://localhost:3000/api/resume",
	function (response) {
		response.pipe(file);

		// after download completed close filestream
		file.on("finish", () => {
			file.close();
			console.log("Download Completed");
		});
	}
);
