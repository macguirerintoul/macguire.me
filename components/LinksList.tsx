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
	tags?: string[];
}

interface LinksListProps {
	initialLinks: Link[];
	initialNextCursor: string | null;
}

export const LinksList = ({
	initialLinks,
	initialNextCursor,
}: LinksListProps) => {
	const [links, setLinks] = useState<Link[]>(initialLinks);
	const [nextCursor, setNextCursor] = useState<string | null>(
		initialNextCursor,
	);
	const [loading, setLoading] = useState(false);
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	// Extract all unique tags from the links
	const allTags = Array.from(
		new Set(links.flatMap((link) => link.tags || []).filter(Boolean)),
	).sort();

	// Filter links based on active tag
	const filteredLinks = activeFilter
		? links.filter((link) => link.tags?.includes(activeFilter))
		: links;

	const fetchLinks = async (cursor: string | null = null) => {
		setLoading(true);
		const url = cursor ? `/api/links?cursor=${cursor}` : "/api/links";
		const res = await fetch(url);
		const data = await res.json();
		setLinks((prevLinks) => [...prevLinks, ...data.links]);
		setNextCursor(data.nextCursor);
		setLoading(false);
	};

	const handleTagFilter = (tag: string | null) => {
		setActiveFilter(tag);
	};

	return (
		<>
			<h1>Links</h1>
			<hr />

			{/* Tag Filter Buttons */}
			{allTags.length > 0 && (
				<div className="mb-6">
					<div className="mb-4 flex flex-wrap gap-2">
						<Button
							variant={activeFilter === null ? "default" : "outline"}
							size="sm"
							onClick={() => handleTagFilter(null)}
						>
							All
						</Button>
						{allTags.map((tag) => (
							<Button
								key={tag}
								variant={activeFilter === tag ? "default" : "outline"}
								size="sm"
								onClick={() => handleTagFilter(tag)}
							>
								{tag}
							</Button>
						))}
					</div>
					{activeFilter && (
						<p className="text-sm text-muted-foreground">
							Showing {filteredLinks.length} link
							{filteredLinks.length !== 1 ? "s" : ""} with tag "{activeFilter}"
						</p>
					)}
				</div>
			)}

			<ul className="list-none pl-0">
				{filteredLinks.map((link, index) => (
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

			{/* Show load more button if there are more results and no filter is active */}
			{nextCursor && !activeFilter && (
				<div className="flex justify-center">
					<Button onClick={() => fetchLinks(nextCursor)} disabled={loading}>
						{loading ? "Loading..." : "Load more"}
					</Button>
				</div>
			)}
		</>
	);
};
