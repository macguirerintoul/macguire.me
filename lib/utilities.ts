export const getBaseDomain = (url: string) => {
	const { hostname } = new URL(url);
	const parts = hostname.split(".");
	return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
};

export async function loadGoogleFont(font: string, text: string) {
	const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/,
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status == 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error("failed to load font data");
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

export async function getLatestCommit() {
	try {
		const latestCommit = await fetch(
			"https://api.github.com/repos/macguirerintoul/macguire.me/commits",
			{
				headers: {
					authorization: "token " + process.env.GITHUB_PAT,
				},
			},
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
