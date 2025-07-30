"use client";

import { Button } from "@/components/ui/button";

interface LinkFiltersProps {
	availableTags: string[];
	activeFilter: string | null;
	onFilterChange: (tag: string | null) => void;
}

export const LinkFilters = ({
	availableTags,
	activeFilter,
	onFilterChange,
}: LinkFiltersProps) => {
	if (availableTags.length === 0) {
		return null;
	}

	return (
		<div className="mb-6">
			<div className="mb-4 flex flex-wrap gap-2">
				<Button
					variant={activeFilter === null ? "default" : "outline"}
					size="sm"
					onClick={() => onFilterChange(null)}
				>
					All
				</Button>
				{availableTags.map((tag) => (
					<Button
						key={tag}
						variant={activeFilter === tag ? "default" : "outline"}
						size="sm"
						onClick={() => onFilterChange(tag)}
					>
						{tag}
					</Button>
				))}
			</div>
		</div>
	);
};