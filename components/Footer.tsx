"use client";
import { MagicLink } from "./MagicLink";
import { Commit } from "types";
import { relativeTime } from "lib/utilities";

const Footer = (props: { commit: Commit | string }) => {
	return (
		<footer
			className="mb-16 border-t border-neutral-300 p-6 text-base motion-safe:animate-floatUpSlow sm:mb-12 sm:p-8 dark:border-neutral-800"
			style={{ "--animation-order": 4 } as React.CSSProperties}
		>
			<div className="mx-auto flex max-w-[var(--max-content-width)] ">
				<div className="w-1/2  text-neutral-600">
					{typeof props.commit !== "string" && (
						<div>
							{props.commit?.url && (
								<span className="text-neutral-500">
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
				</div>
				<div className="flex w-1/2 flex-col">
					<MagicLink href="https://github.com/macguirerintoul">
						GitHub
					</MagicLink>
					<MagicLink href="https://docs.macguire.me">Docs</MagicLink>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
