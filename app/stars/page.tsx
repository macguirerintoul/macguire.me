import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { FancyListLink } from "components/FancyListLink";
import { getStars } from "lib/stars";
import { Star } from "@/types/star";
import { Star as StarIcon } from "react-feather";

export const revalidate = 86400;

export const metadata: Metadata = {
	title: "Stars " + titleTemplate,
};

const Stars = async () => {
	const stars: Star[] = await getStars();

	return (
		<>
			<section>
				<h1>Stars</h1>
				<hr />
				<ul className="list-none pl-0">
					{stars.map((star, index) => {
						return (
							<FancyListLink
								key={index}
								href={star.html_url}
								title={star.full_name}
								style={{ "--animation-order": index } as React.CSSProperties}
								subtitle={star.description}
								rightSide={
									<>
										<StarIcon size={16} className="mr-1" />{" "}
										{star.stargazers_count}
									</>
								}
							/>
						);
					})}
				</ul>
			</section>
		</>
	);
};

export default Stars;
