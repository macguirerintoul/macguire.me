import { ComponentType } from "react";
import { MagicLink } from "./MagicLink";
import { Icon } from "react-feather";
interface SidebarItemProps {
	href: string;
	label: string;
	icon: Icon;
}

export const SidebarItem = ({ href, label, icon: Icon }: SidebarItemProps) => {
	return (
		<li>
			<MagicLink
				href={href}
				className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-neutral-700 no-underline transition-colors hover:bg-neutral-200 hover:text-black dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white"
			>
				<Icon size={16} />
				<span>{label}</span>
			</MagicLink>
		</li>
	);
};
