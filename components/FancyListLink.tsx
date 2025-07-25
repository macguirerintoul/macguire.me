import { MagicLink } from "./MagicLink";

export const FancyListLink = (props: {
	href: string;
	title: string;
	subtitle?: string;
	rightSide?: string | React.ReactNode;
	style?: React.CSSProperties;
}) => {
	return (
		<MagicLink
			arrow={false}
			href={props.href}
			style={props.style}
			className="mb-2 flex justify-between gap-4 rounded-md border border-neutral-200 bg-white p-4 text-black no-underline shadow-xs duration-75 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 hover:dark:bg-neutral-950 hover:dark:text-neutral-100"
		>
			<div className="flex shrink gap-2 truncate">
				<span>{props.title}</span>
				<span className="truncate text-neutral-500">{props.subtitle}</span>
			</div>
			<span className="flex shrink-0 items-center text-right text-neutral-500">
				{props.rightSide}
			</span>
		</MagicLink>
	);
};
