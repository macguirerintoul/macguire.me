import { MagicLink } from "./index";
import { Commit } from "types";
import { relativeTime } from "lib/utilities";

const Footer = (props: { commit: Commit | string }) => {
	return (
		<footer className="mb-12 border-t border-neutral-300 p-8">
			<div className="mx-auto flex max-w-[var(--max-content-width)] ">
				<div className="w-1/2">
					{typeof props.commit !== "string" && (
						<div>
							{props.commit?.url && (
								<>
									Updated{" "}
									<MagicLink
										className="whitespace-nowrap"
										url={props.commit.url}
									>
										{relativeTime(props.commit.timestamp)}
									</MagicLink>
								</>
							)}
						</div>
					)}
				</div>
				<div className="flex w-1/2 flex-col">
					<MagicLink url="https://github.com/macguirerintoul">GitHub</MagicLink>
					<MagicLink url="https://docs.macguire.me">Docs</MagicLink>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
