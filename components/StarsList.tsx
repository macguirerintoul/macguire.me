"use client";
import { Button } from "@/components/ui/button";
import { FancyListLink } from "components/FancyListLink";
import { Star } from "@/types/star";
import { Star as StarIcon } from "react-feather";
import { useState } from "react";

export const StarsList = ({
	initialStars,
	initialNextCursor,
}: {
	initialStars: Star[];
	initialNextCursor: string | null;
}) => {
	const [stars, setStars] = useState<Star[]>(initialStars);
	const [nextCursor, setNextCursor] = useState<string | null>(
		initialNextCursor,
	);
	const [loading, setLoading] = useState(false);

	const fetchStars = async (cursor: string) => {
		setLoading(true);
		const url = `/api/stars?cursor=${cursor}`;
		const res = await fetch(url);
		const data = await res.json();
		setStars((prevStars) => [...prevStars, ...data.stars]);
		setNextCursor(data.nextCursor);
		setLoading(false);
	};

	return (
		<>
			<h1>Stars</h1>
			<hr />
			<ul className="list-none pl-0">
				{stars.map((star, index) => (
					<FancyListLink
						key={index}
						href={star.html_url}
						title={star.full_name}
						style={{ "--animation-order": index } as React.CSSProperties}
						subtitle={star.description}
						rightSide={
							<>
								<StarIcon size={16} className="mr-1" />{" "}
								{Intl.NumberFormat("en-US", {
									notation: "compact",
								}).format(star.stargazers_count)}
							</>
						}
					/>
				))}
			</ul>
			{nextCursor && (
				<div className="flex justify-center">
					<Button onClick={() => fetchStars(nextCursor)} disabled={loading}>
						{loading ? "Loading..." : "Load more"}
					</Button>
				</div>
			)}
		</>
	);
};
