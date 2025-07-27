"use client";
import { Button } from "@/components/ui/button";
import { FancyListLink } from "components/FancyListLink";
import { getBaseDomain } from "lib/utilities";
import twas from "twas";
import { useState } from "react";

interface Link {
	href: string;
	name: string;
	created: string;
}

export const LinksList = ({ initialLinks, initialNextCursor }) => {
	const [links, setLinks] = useState<Link[]>(initialLinks);
	const [nextCursor, setNextCursor] = useState<string | null>(
		initialNextCursor,
	);
	const [loading, setLoading] = useState(false);

	const fetchLinks = async (cursor: string | null = null) => {
		setLoading(true);
		const url = cursor ? `/api/links?cursor=${cursor}` : "/api/links";
		const res = await fetch(url);
		const data = await res.json();
		setLinks((prevLinks) => [...prevLinks, ...data.links]);
		setNextCursor(data.nextCursor);
		setLoading(false);
	};

	return (
		<>
			<h1>Links</h1>
			<hr />
			<ul className="list-none pl-0">
				{links.map((link, index) => (
					<FancyListLink
						key={index}
						href={link.href}
						title={link.name}
						style={{ "--animation-order": index } as React.CSSProperties}
						subtitle={getBaseDomain(link.href)}
						rightSide={twas(new Date(link.created).valueOf())}
					/>
				))}
			</ul>
			{nextCursor && (
				<div className="flex justify-center">
					<Button onClick={() => fetchLinks(nextCursor)} disabled={loading}>
						{loading ? "Loading..." : "Load more"}
					</Button>
				</div>
			)}
		</>
	);
};
