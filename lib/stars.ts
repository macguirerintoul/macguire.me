import { Star } from "@/types/star";

export async function getStars() {
	try {
		const stars = await fetch(
			"https://api.github.com/users/macguirerintoul/starred",
			{
				headers: {
					authorization: "token " + process.env.GITHUB_PAT,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				return data as Star[];
			});

		return stars;
	} catch (error) {
		console.error(error);
		return [];
	}
}
