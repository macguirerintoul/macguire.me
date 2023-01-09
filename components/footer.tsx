import MagicLink from "./magiclink";
import { ICommit } from "../lib/types";
import { relativeTime } from "../lib/utilities";

export default function Footer(props: { commit: ICommit | undefined }) {
	return (
		<footer>
			<div className="columns-12 side-padded">
				<div className="left">
					<div>
						{props.commit?.url && (
							<>
								Updated{" "}
								<MagicLink url={props.commit.url}>
									{relativeTime(new Date(Date.parse(props.commit.timestamp)))}
								</MagicLink>
							</>
						)}
					</div>
					<MagicLink url="/colophon">Colophon</MagicLink>
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
