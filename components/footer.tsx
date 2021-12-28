import MagicLink from "./magiclink";
import { ICommit } from "../lib/types";
import { relativeTime } from "../lib/utilities";

export default function Footer(props: { commit: ICommit | undefined }) {
	return (
		<footer>
			<div className="container">
				<p>
					© {new Date().getFullYear()} Macguire Rintoul. All rights reserved.
				</p>
				<p>
					<MagicLink url="/colophon">Colophon</MagicLink>
				</p>
				{props.commit?.url && (
					<p>
						Last updated{" "}
						<MagicLink url={props.commit.url}>
							{relativeTime(new Date(Date.parse(props.commit.timestamp)))}
						</MagicLink>{" "}
					</p>
				)}
			</div>
		</footer>
	);
}
