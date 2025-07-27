"use client";
import { Button } from "@/components/ui/button";
import { FancyListLink } from "components/FancyListLink";
import { getBaseDomain } from "lib/utilities";
import twas from "twas";
import { useState, useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { mutate } from "swr";
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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	const getInitialState = () => {
		return { links: initialLinks, nextCursor: initialNextCursor };
	};

	const getKey = useCallback(
		(pageIndex: number, previousPageData: any) => {
			// If we've reached the end, stop fetching
			if (previousPageData && !previousPageData.nextCursor) return null;

			const params = new URLSearchParams();

			// Add tag filter if active (only if not null)
			if (activeFilter !== null) {
				params.append("tag", activeFilter);
			}

			// Add cursor for pagination
			if (pageIndex > 0 && previousPageData?.nextCursor) {
				params.append("cursor", previousPageData.nextCursor);
			}

			const queryString = params.toString();
			return `/api/links${queryString ? `?${queryString}` : ""}`;
		},
		[activeFilter],
	);

	const { data, error, size, setSize, isLoading, isValidating } =
		useSWRInfinite(getKey, fetcher, {
			fallbackData:
				activeFilter === null
					? [
							{
								links: initialLinks,
								nextCursor: initialNextCursor,
							},
						]
					: undefined,
			revalidateOnMount: false,
			revalidateOnFocus: false,
			revalidateIfStale: false,
		});

	const handleTagFilter = (tag: string | null) => {
		setActiveFilter(tag);
	};

	const displayLinks = data ? data.flatMap((page) => page.links) : [];
	const hasMore = data ? data[data.length - 1]?.nextCursor : false;

	return (
		<>
			<h1>Links</h1>
			<hr />

			{/* Error Message */}
			{error && (
				<div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
					<p className="text-sm text-red-800">
						<strong>Error:</strong> {error.message}
					</p>
				</div>
			)}

			{/* Tag Filter Buttons */}
			{availableTags.length > 0 && (
				<div className="mb-6">
					<div className="mb-4 flex flex-wrap gap-2">
						<Button
							variant={activeFilter === null ? "default" : "outline"}
							size="sm"
							onClick={() => {
								handleTagFilter(null);
								// Reset to initial state without triggering a new request
								mutate("/api/links", getInitialState(), {
									revalidate: false,
									populateCache: true,
								});
							}}
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

			{isLoading ? (
				<ul className="list-none pl-0">
					{Array.from({ length: 20 }).map((_, index) => (
						<li key={index} className="mb-2">
							<LinkSkeleton />
						</li>
					))}
				</ul>
			) : (
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
				</ul>
			)}

			{/* Show load more button if there are more results */}
			{hasMore && (
				<div className="flex justify-center">
					<Button onClick={() => setSize(size + 1)} disabled={isValidating}>
						{isValidating ? "Loading..." : "Load more"}
					</Button>
				</div>
			)}
		</>
	);
};
