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
	availableTags: string[];
}

// Skeleton component for loading state
const LinkSkeleton = () => (
	<div className="mb-2 animate-pulse rounded-md border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
		<div className="flex justify-between gap-4">
			<div className="flex shrink gap-2 truncate">
				<div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700"></div>
				<div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700"></div>
			</div>
			<div className="flex shrink-0 items-center text-right">
				<div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-700"></div>
			</div>
		</div>
	</div>
);

export const LinksList = ({
	initialLinks,
	initialNextCursor,
	availableTags,
}: LinksListProps) => {
	const [allLinks, setAllLinks] = useState<Link[]>(initialLinks);
	const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
	const [nextCursor, setNextCursor] = useState<string | null>(
		initialNextCursor,
	);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	// Determine which links to display
	const displayLinks = activeFilter ? filteredLinks : allLinks;

	const fetchLinks = async (
		cursor: string | null = null,
		tagFilter?: string | null,
	) => {
		setLoading(true);
		setError(null);

		try {
			const params = new URLSearchParams();
			if (cursor) params.append("cursor", cursor);
			// Use the passed tagFilter parameter or fall back to activeFilter state
			const tagToUse = tagFilter !== undefined ? tagFilter : activeFilter;
			if (tagToUse) params.append("tag", tagToUse);

			const url = `/api/links${params.toString() ? `?${params.toString()}` : ""}`;
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();

			// Check if the response contains an error
			if (data.error) {
				throw new Error(data.details || data.error);
			}

			// Validate the response structure
			if (!data.links || !Array.isArray(data.links)) {
				throw new Error(
					"Invalid response format: missing or invalid links array",
				);
			}

			// Use the same tag logic for determining which state to update
			const currentTag = tagFilter !== undefined ? tagFilter : activeFilter;
			if (currentTag) {
				// When filtering, append to filtered links
				setFilteredLinks((prevLinks) =>
					cursor ? [...prevLinks, ...data.links] : data.links,
				);
			} else {
				// When not filtering, append to all links
				setAllLinks((prevLinks) => [...prevLinks, ...data.links]);
			}
			setNextCursor(data.nextCursor);
		} catch (err) {
			console.error("Error fetching links:", err);
			setError(err instanceof Error ? err.message : "Failed to fetch links");
		} finally {
			setLoading(false);
		}
	};

	const handleTagFilter = async (tag: string | null) => {
		setActiveFilter(tag);
		setError(null);

		if (tag) {
			// Fetch filtered results from the beginning
			setFilteredLinks([]);
			setNextCursor(null); // Reset cursor for new filter
			await fetchLinks(null, tag); // Pass the tag directly
		} else {
			// Clear filtered results and show all links
			setFilteredLinks([]);
			setNextCursor(initialNextCursor);
		}
	};

	return (
		<>
			<h1>Links</h1>
			<hr />

			{/* Error Message */}
			{error && (
				<div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
					<p className="text-sm text-red-800">
						<strong>Error:</strong> {error}
					</p>
					<Button
						variant="outline"
						size="sm"
						onClick={() => fetchLinks()}
						className="mt-2"
					>
						Try again
					</Button>
				</div>
			)}

			{/* Tag Filter Buttons */}
			{availableTags.length > 0 && (
				<div className="mb-6">
					<div className="mb-4 flex flex-wrap gap-2">
						<Button
							variant={activeFilter === null ? "default" : "outline"}
							size="sm"
							onClick={() => handleTagFilter(null)}
						>
							All
						</Button>
						{availableTags.map((tag) => (
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
				</div>
			)}

			<ul className="list-none pl-0">
				{displayLinks.map((link, index) => (
					<FancyListLink
						key={index}
						href={link.href}
						title={link.name}
						style={{ "--animation-order": index } as React.CSSProperties}
						subtitle={getBaseDomain(link.href)}
						rightSide={twas(new Date(link.created).valueOf())}
					/>
				))}
				{/* Show skeleton while loading */}
				{loading && (
					<>
						<LinkSkeleton />
						<LinkSkeleton />
						<LinkSkeleton />
					</>
				)}
			</ul>

			{/* Show load more button if there are more results */}
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
