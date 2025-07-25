import { Star } from "@/types/star";
import { revalidate } from "app/links/page";

export async function getStars() {
	try {
		const stars = await fetch(
			"https://api.github.com/users/macguirerintoul/starred",
			{
				headers: {
					authorization: "token " + process.env.GITHUB_PAT,
				},
				next: { revalidate: 86400 },
			},
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
