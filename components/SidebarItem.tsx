import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MagicLink } from "./MagicLink";
import { Icon as FeatherIconType } from "react-feather";
interface SidebarItemProps {
	href: string;
	label: string;
	icon: FeatherIconType | typeof GitHubLogoIcon;
}

export const SidebarItem = ({ href, label, icon: Icon }: SidebarItemProps) => {
	return (
		<li className="m-0">
			<MagicLink
				href={href}
				className="flex items-center gap-2 rounded-md p-2 text-base font-medium text-neutral-800 no-underline transition-colors hover:bg-neutral-200 hover:text-black dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white"
			>
				<Icon size={16} />
				<span>{label}</span>
			</MagicLink>
		</li>
	);
};
