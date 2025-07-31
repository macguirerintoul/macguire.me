"use client";
import { Button } from "@/components/ui/button";
import { FancyListLink } from "components/FancyListLink";
import { getBaseDomain } from "lib/utilities";
import twas from "twas";
import { Fragment, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { LinkFilters } from "./LinkFilters";

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
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
		className="mb-2 animate-pulse rounded-md border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
	>
		<div className="flex justify-between gap-4">
			<div className="flex shrink gap-2 truncate">
				<div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700"></div>
				<div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700"></div>
			</div>
			<div className="flex shrink-0 items-center text-right">
				<div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-700"></div>
			</div>
		</div>
	</motion.div>
);

export const LinksList = ({
	initialLinks,
	initialNextCursor,
	availableTags,
}: LinksListProps) => {
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
	} = useInfiniteQuery({
		queryKey: ["links", activeFilter],
		queryFn: ({ pageParam }) => {
			const params = new URLSearchParams();
			if (activeFilter !== null) params.append("tag", activeFilter);
			if (pageParam) params.append("cursor", pageParam);
			const queryString = params.toString();
			return fetch(`/api/links${queryString ? `?${queryString}` : ""}`).then(
				(res) => res.json(),
			);
		},
		initialPageParam: undefined,
		getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
		initialData:
			activeFilter === null
				? {
						pages: [{ links: initialLinks, nextCursor: initialNextCursor }],
						pageParams: [undefined],
					}
				: undefined,
	});

	// Flatten all pages of links
	const allLinks =
		data?.pages.flatMap((page) => page.links || []).filter(Boolean) ||
		Array(20).fill(0);

	return (
		<>
			{/* Error Message */}
			{isError && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="mb-4 rounded-md border border-red-200 bg-red-50 p-4"
				>
					<p className="text-sm text-red-800">
						<strong>Error:</strong> {error?.message || "An error occurred"}
					</p>
				</motion.div>
			)}

			<LinkFilters
				availableTags={availableTags}
				activeFilter={activeFilter}
				onFilterChange={setActiveFilter}
			/>

			<AnimatePresence>
				<Fragment key={activeFilter || "all"}>
					<motion.ul
						key={activeFilter || "all"}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{
							duration: 0.2,
							ease: "easeInOut",
						}}
						className="list-none pl-0"
					>
						{allLinks.map((link: Link, index: number) => {
							return (
								<motion.li
									key={`${activeFilter}-${index}`}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.4,
										delay: index * 0.05,
										ease: "easeOut",
									}}
									className="mb-2"
								>
									<FancyListLink
										isLoading={isLoading}
										href={link.href}
										title={link.name}
										subtitle={!isLoading && getBaseDomain(link.href)}
										rightSide={
											!isLoading && twas(new Date(link.created).valueOf())
										}
									/>
								</motion.li>
							);
						})}
					</motion.ul>
				</Fragment>
			</AnimatePresence>

			{/* Show load more button if there are more results */}
			{hasNextPage && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: 0.2 }}
					className="flex justify-center"
				>
					<Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
						{isFetchingNextPage ? "Loading..." : "Load more"}
					</Button>
				</motion.div>
			)}
		</>
	);
};
