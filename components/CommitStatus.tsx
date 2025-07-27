import { connection } from "next/server";
import twas from "twas";
import { GitCommit } from "react-feather";
import { MagicLink } from "./MagicLink";

export async function CommitStatus({
	timestamp,
	sha,
}: {
	timestamp: number;
	sha: string;
}) {
	await connection();
	const time = twas(timestamp);
	return (
		<div className="flex items-center gap-2">
			<GitCommit size={16} />
			<MagicLink
				arrow={false}
				className="text-inherit no-underline"
				href="https://github.com/macguirerintoul/macguire.me"
			>
				<code className="mr-1 rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-800">
					{sha.substring(0, 7)}
				</code>
				<span>{time}</span>
			</MagicLink>
		</div>
	);
}
