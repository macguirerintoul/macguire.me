import { MagicLink } from "./MagicLink";

export const FancyListLink = (props: {
	href: string;
	title: string;
	isLoading?: boolean;
	subtitle?: string;
	rightSide?: string | React.ReactNode;
}) => {
	return (
		<MagicLink
			arrow={false}
			href={props.href || ""}
			className="mb-2 flex justify-between gap-4 rounded-md border border-neutral-200 bg-white p-4 text-black no-underline shadow-xs duration-75 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 hover:dark:bg-neutral-950 hover:dark:text-neutral-100"
		>
			<div
				className={`flex shrink gap-2 truncate ${props.isLoading && "h-6 w-64 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700"}`}
			>
				{/* animating this probably isnt working because the array rendering them changes */}
				<span className="animate-in fade-in">
					{!props.isLoading && props.title}
				</span>
				<span className="animate-in truncate text-neutral-500 fade-in">
					{props.subtitle}
				</span>
			</div>
			<span className="flex shrink-0 animate-in items-center text-right text-neutral-500 fade-in">
				{props.rightSide}
			</span>
		</MagicLink>
	);
};
