import { MagicLink } from "./index";
import { Commit } from "types";
import { relativeTime } from "lib/utilities";

const Footer = (props: { commit: Commit | string }) => {
	return (
		<footer className="p-8">
			<div className="util-content-width columns-12">
				<div className="left">
					{typeof props.commit !== "string" && (
						<div>
							{props.commit?.url && (
								<>
									Updated{" "}
									<MagicLink
										className="whitespace-nowrap"
										url={props.commit.url}
									>
										{relativeTime(new Date(Date.parse(props.commit.timestamp)))}
									</MagicLink>
								</>
							)}
						</div>
					)}
				</div>
				<div className="right">
					<MagicLink url="https://github.com/macguirerintoul">GitHub</MagicLink>
					<MagicLink url="https://docs.macguire.me">Docs</MagicLink>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
