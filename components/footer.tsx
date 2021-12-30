import MagicLink from "./magiclink";
import { ICommit } from "../lib/types";
import { relativeTime } from "../lib/utilities";

export default function Footer(props: { commit: ICommit | undefined }) {
	return (
		<footer>
			<div className="container">
				<div className="left">
					{props.commit?.url && (
						<span>
							Last updated{" "}
							<MagicLink url={props.commit.url}>
								{relativeTime(new Date(Date.parse(props.commit.timestamp)))}
							</MagicLink>{" "}
						</span>
					)}
					<span>
						Read the <MagicLink url="/colophon">colophon</MagicLink>
					</span>
					<span>All rights belong to their respective owners.</span>
				</div>
				<div className="right">
					<MagicLink url="https://www.linkedin.com/in/macguirerintoul/">
						LinkedIn
					</MagicLink>
					<MagicLink url="https://github.com/macguirerintoul">GitHub</MagicLink>
				</div>
			</div>
		</footer>
	);
}
