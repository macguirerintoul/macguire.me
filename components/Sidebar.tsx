import { Commit } from "types";
import { relativeTime } from "lib/utilities";
import { MagicLink } from "@/components/MagicLink";
import {
	Home,
	Briefcase,
	BookOpen,
	Image,
	Link2,
	Mail,
	MapPin,
	GitHub,
	GitCommit,
	Linkedin,
	Star,
	Music,
} from "react-feather";
import { SidebarItem } from "./SidebarItem";

const items = [
	{ href: "/", label: "Home", icon: Home },
	{ href: "/resume", label: "Resume", icon: Briefcase },
	{ href: "/blog", label: "Blog", icon: BookOpen },
	{ href: "/photos", label: "Photos", icon: Image },
	{ href: "/links", label: "Links", icon: Link2 },
	{ href: "/stars", label: "Stars", icon: Star },
	{ href: "/music", label: "Music", icon: Music },
	{ href: "/contact", label: "Contact", icon: Mail },
];

const externalItems = [
	{ href: "https://github.com/macguirerintoul", label: "GitHub", icon: GitHub },
	{
		href: "https://www.linkedin.com/in/macguirerintoul/",
		label: "LinkedIn",
		icon: Linkedin,
	},
];

export const Sidebar = (props: { commit: Commit | string }) => {
	return (
		<aside className="sticky top-0 flex h-screen w-3xs shrink-0 flex-col justify-between border-r border-neutral-200 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-950">
			<nav>
				<ul className="m-0 flex list-none flex-col gap-2 p-2">
					{items.map(({ href, label, icon }) => (
						<SidebarItem key={href} href={href} label={label} icon={icon} />
					))}
				</ul>
			</nav>
			<div className="w-full">
				<ul className="m-0 flex list-none flex-col gap-2 p-2">
					{externalItems.map(({ href, label, icon }) => (
						<SidebarItem key={href} href={href} label={label} icon={icon} />
					))}
				</ul>
				<div className="flex flex-col gap-2 border-t border-neutral-200 p-4 dark:border-neutral-900 dark:text-neutral-500">
					{typeof props.commit !== "string" && (
						<div className="flex items-center gap-2">
							<GitCommit size={16} />
							<MagicLink
								arrow={false}
								className="text-inherit no-underline"
								href="https://github.com/macguirerintoul/macguire.me"
							>
								<code className="mr-1 rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-800">
									{props.commit?.sha.substring(0, 7)}
								</code>
								<span>{relativeTime(props.commit?.timestamp)}</span>
							</MagicLink>
						</div>
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
