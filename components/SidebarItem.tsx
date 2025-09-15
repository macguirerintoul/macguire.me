import { MagicLink } from "./MagicLink";
import { ReactNode } from "react";

interface SidebarItemProps {
	href: string;
	label: string;
	icon: ReactNode;
}

export const SidebarItem = ({ href, label, icon }: SidebarItemProps) => {
	return (
		<li className="m-0">
			<MagicLink
				href={href}
				className="flex items-center gap-2 rounded-md p-2 text-base font-medium text-neutral-800 no-underline transition-colors hover:bg-neutral-200 hover:text-black dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white"
			>
				{icon}
				<span>{label}</span>
			</MagicLink>
		</li>
	);
};