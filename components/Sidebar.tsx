"use client";
import { Commit } from "types";
import {
	Home,
	Briefcase,
	BookOpen,
	Image as ImageIcon,
	Link2,
	Mail,
	MapPin,
	Star,
	Music,
} from "react-feather";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { SidebarItem } from "./SidebarItem";
import { LatestCommit } from "./LatestCommit";
import { usePathname } from "next/navigation";

const items = [
	{ href: "/", label: "Home", icon: <Home size={16} /> },
	{ href: "/resume", label: "Resume", icon: <Briefcase size={16} /> },
	{ href: "/blog", label: "Blog", icon: <BookOpen size={16} /> },
	{ href: "/photos", label: "Photos", icon: <ImageIcon size={16} /> },
	{ href: "/links", label: "Links", icon: <Link2 size={16} /> },
	{ href: "/stars", label: "Stars", icon: <Star size={16} /> },
	{ href: "/music", label: "Music", icon: <Music size={16} /> },
	{ href: "/contact", label: "Contact", icon: <Mail size={16} /> },
];

const externalItems = [
	{
		href: "https://github.com/macguirerintoul",
		label: "GitHub",
		icon: <GitHubLogoIcon width={16} height={16} />,
	},
	{
		href: "https://www.linkedin.com/in/macguirerintoul/",
		label: "LinkedIn",
		icon: <LinkedInLogoIcon width={16} height={16} />,
	},
];

export const Sidebar = (props: { commit: Commit | string }) => {
	const pathname = usePathname();

	return (
		<aside className="sticky top-0 flex h-screen w-3xs shrink-0 flex-col justify-between border-r border-neutral-200 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-950">
			<nav>
				<div className="mt-4 mr-0 mb-2 ml-6 text-xl font-semibold">
					macguire.me
				</div>
				<ul className="m-0 flex list-none flex-col gap-1 p-2">
					{items.map(({ href, label, icon }) => (
						<SidebarItem
							key={href}
							href={href}
							label={label}
							icon={icon}
							isActive={pathname === href}
						/>
					))}
				</ul>
			</nav>
			<div className="w-full">
				<ul className="m-0 flex list-none flex-col gap-1 p-2">
					{externalItems.map(({ href, label, icon }) => (
						<SidebarItem
							key={href}
							href={href}
							label={label}
							icon={icon}
							isActive={false}
						/>
					))}
				</ul>
				<div className="flex flex-col gap-2 border-t border-neutral-200 p-4 pl-6 text-neutral-700 dark:border-neutral-900 dark:text-neutral-500">
					{typeof props.commit !== "string" && (
						<LatestCommit
							timestamp={props.commit.timestamp.valueOf()}
							sha={props.commit.sha}
						/>
					)}
					<div className="flex items-center gap-2">
						<MapPin size={16} />
						<span>Coquitlam, BC</span>
					</div>
				</div>
			</div>
		</aside>
	);
};
