"use client";
import { MagicLink } from "./MagicLink";
import { Commit } from "types";
import { relativeTime } from "lib/utilities";

import { GitCommit, MapPin } from "react-feather";

const Footer = (props: { commit: Commit | string }) => {
	return (
		<footer className="p-6 text-base sm:p-8   dark:text-neutral-600"></footer>
	);
};

export { Footer };
