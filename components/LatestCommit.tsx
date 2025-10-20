"use client";
import { useState, useEffect } from "react";
import twas from "twas";
import { GitCommit } from "react-feather";
import { MagicLink } from "./MagicLink";

export function LatestCommit({
	timestamp,
	sha,
}: {
	timestamp: number;
	sha: string;
}) {
	const [time, setTime] = useState("");

	useEffect(() => {
		setTime(twas(timestamp));
	}, [timestamp]);

	return (
		<div className="flex items-center gap-2">
			<GitCommit size={16} />
			<MagicLink
				arrow={false}
				className="text-inherit no-underline"
				href="https://github.com/macguirerintoul/macguire.me"
			>
				<code className="mr-1 rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-900">
					{sha.substring(0, 7)}
				</code>
				<span
					className={`${time === "" ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
				>
					{time}
				</span>
			</MagicLink>
		</div>
	);
}
