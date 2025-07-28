"use client";
import { Button } from "@/components/ui/button";
import { FancyListLink } from "components/FancyListLink";
import { getBaseDomain } from "lib/utilities";
import twas from "twas";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";

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
		data?.pages.flatMap((page) => page.links || []).filter(Boolean) || [];

	return (
		<>
			<h1>Links</h1>
			<hr />

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

			{/* Tag Filter Buttons */}
			{availableTags.length > 0 && (
				<div className="mb-6">
					<div className="mb-4 flex flex-wrap gap-2">
						<Button
							variant={activeFilter === null ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveFilter(null)}
						>
							All
						</Button>
						{availableTags.map((tag) => (
							<Button
								key={tag}
								variant={activeFilter === tag ? "default" : "outline"}
								size="sm"
								onClick={() => setActiveFilter(tag)}
							>
								{tag}
							</Button>
						))}
					</div>
				</div>
			)}

			<AnimatePresence mode="wait">
				{isLoading ? (
					// Show skeletons when loading
					<motion.ul
						key={`${activeFilter || "all"}-loading`}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{
							duration: 0.2,
							ease: "easeInOut",
						}}
						className="list-none pl-0"
					>
						{Array.from({ length: 20 }).map((_, index) => (
							<motion.li
								key={index}
								className="mb-2"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.3,
									delay: index * 0.05,
									ease: "easeOut",
								}}
							>
								<LinkSkeleton />
							</motion.li>
						))}
					</motion.ul>
				) : (
					// Show actual links when not loading
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
							if (!link || !link.href || !link.name) {
								return null;
							}
							return (
								<motion.li
									key={`${link.href}-${index}`}
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
										href={link.href}
										title={link.name}
										style={
											{ "--animation-order": index } as React.CSSProperties
										}
										subtitle={getBaseDomain(link.href)}
										rightSide={twas(new Date(link.created).valueOf())}
									/>
								</motion.li>
							);
						})}
					</motion.ul>
				)}
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
