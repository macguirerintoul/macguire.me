// import { time } from "console";

// import localFont from "next/font/local";

// export const timesNow = localFont({
// 	variable: "--times-now",
// 	src: [
// 		{
// 			path: "../styles/TimesNow/TimesNow-Light.ttf",
// 			weight: "400",
// 			style: "normal",
// 		},
// 	],
// });

export const baseurl =
	process.env.NODE_ENV === "production"
		? "https://macguire.me"
		: "http://localhost:3000";

// Truncates a string to the specified length without splitting up words.
export function truncateOnWord(str: string, len = 200) {
	// trimmable includes characters that will be removed from the string (e.g. emojis)
	const trimmable =
		"\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF";
	const reg = new RegExp("(?=[" + trimmable + "])");
	const words = str.split(reg);
	let count = 0;
	return words
		.filter(function (word) {
			count += word.length;
			return count <= len;
		})
		.join("")
		.concat("...");
}

// turns a timestamp into a nicely readable date string
export function toDateString(timestamp: Date) {
	return new Date(timestamp).toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

export function toMonthString(timestamp: Date) {
	return new Date(timestamp).toLocaleDateString(undefined, {
		year: "numeric",
		month: "long",
	});
}

const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
	{ unit: "year", ms: 31536000000 },
	{ unit: "month", ms: 2628000000 },
	{ unit: "day", ms: 86400000 },
	{ unit: "hour", ms: 3600000 },
	{ unit: "minute", ms: 60000 },
	{ unit: "second", ms: 1000 },
];
const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/**
 * Get language-sensitive relative time message from Dates.
 * @param timestamp - a timestamp
 */
export function relativeTime(timestamp: Date): string {
	if (!timestamp) return "";
	console.log(timestamp);
	const elapsed = timestamp.getTime() - new Date().getTime();
	return relativeTimeFromElapsed(elapsed);
}

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
export function relativeTimeFromElapsed(elapsed: number): string {
	for (const { unit, ms } of units) {
		if (Math.abs(elapsed) >= ms || unit === "second") {
			return rtf.format(Math.round(elapsed / ms), unit);
		}
	}
	return "";
}

export async function getLatestCommit() {
	try {
		const latestCommit = await fetch(
			"https://api.github.com/repos/macguirerintoul/macguire.me/commits",
			{
				headers: {
					authorization: "token " + process.env.GITHUB_PAT,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				return data[0];
			});

		return {
			url: latestCommit.html_url as string,
			timestamp: new Date(Date.parse(latestCommit.commit.committer.date)),
			sha: latestCommit.sha,
			message: latestCommit.commit.message,
		};
	} catch (error) {
		console.error(error);
		return "Failed to get latest commit";
	}
}

export const titleTemplate = " • Macguire Rintoul";
