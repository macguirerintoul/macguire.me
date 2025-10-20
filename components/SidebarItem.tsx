import { MagicLink } from "./MagicLink";
import { ReactNode } from "react";

interface SidebarItemProps {
	href: string;
	label: string;
	icon: ReactNode;
	isActive?: boolean;
}

export const SidebarItem = ({
	href,
	label,
	icon,
	isActive = false,
}: SidebarItemProps) => {
	return (
		<li className="m-0">
			<MagicLink
				href={href}
				className={`flex items-center gap-3 rounded-md p-2 px-4 text-base font-medium text-neutral-700 no-underline transition-colors hover:bg-neutral-100 hover:text-black dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white ${isActive ? "bg-white text-black shadow-xs ring ring-neutral-100 hover:bg-white dark:bg-neutral-900 dark:ring-neutral-800" : ""}`}
			>
				{icon}
				<span>{label}</span>
			</MagicLink>
		</li>
	);
};
