import MagicLink from "./magiclink";

interface IProps {
	github: { url: string; timestamp: string };
}

export default function Footer(props: IProps) {
	return (
		<footer>
			<div className="container">
				<p>
					© {new Date().getFullYear()} Macguire Rintoul. All rights reserved.
				</p>
				<p>
					<MagicLink url="/colophon">Colophon</MagicLink>
				</p>
				<p>
					Last updated{" "}
					<MagicLink url={props.github.url}>{props.github.timestamp}</MagicLink>{" "}
				</p>
			</div>
		</footer>
	);
}
