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
	Star,  Music,
} from "react-feather";
import { SidebarItem } from "./SidebarItem";

const items = [
	{ href: "/", label: "Home", icon: Home },
	{ href: "/resume", label: "Resume", icon: Briefcase },
	{ href: "/blog", label: "Blog", icon: BookOpen },
	{ href: "/photos", label: "Photos", icon: Image },
	{ href: "/links", label: "Links", icon: Link2 },
	{ href: "/stars", label: "Stars", icon: Star },{ href: "/music", label: "Music", icon: Music },
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
		<aside className="w-3xs shrink-0 sticky top-0 flex h-screen flex-col justify-between border-neutral-200 border-r bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-950">
			<nav>
				<ul className="m-0 list-none p-2">
					{items.map(({ href, label, icon }) => (
						<SidebarItem key={href} href={href} label={label} icon={icon} />
					))}
				</ul>
			</nav>
			<div>
				<ul className="m-0 list-none p-2">
					{externalItems.map(({ href, label, icon }) => (
						<SidebarItem key={href} href={href} label={label} icon={icon} />
					))}
				</ul>
				<div className="flex flex-col gap-2 border-t border-neutral-200 p-4">
					{typeof props.commit !== "string" && (
						<div className="flex items-center">
							{props.commit?.url && (
								<span className="">
									<GitCommit size={16} className="mr-1 inline" />
									<MagicLink
										arrow={false}
										className="no-underline"
										href="https://github.com/macguirerintoul/macguire.me"
									>
										<code className="mr-1 rounded bg-neutral-200 px-1 py-0.5 text-base text-neutral-600 hover:text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-500">
											{props.commit?.sha.substring(0, 7)}
										</code>
									</MagicLink>
									<span>{relativeTime(props.commit?.timestamp)}</span>
								</span>
							)}
						</div>
					)}
					<div className="flex items-center">
						<MapPin size={16} className="mr-1 inline" />
						<span>Coquitlam, BC</span>
					</div>
				</div>
			</div>
		</aside>
	);
};
