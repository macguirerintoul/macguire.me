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

export const titleTemplate = " • Macguire Rintoul";
