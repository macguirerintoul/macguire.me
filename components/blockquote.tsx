import { ReactElement } from "react";
import MagicLink from "./magiclink";

export default function Blockquote(props: {
	url: string;
	source: string;
	children: ReactElement;
}) {
	let cite: ReactElement;
	if (props.url && props.url.length > 0) {
		cite = (
			<span>
				— <MagicLink url={props.url}>{props.source}</MagicLink>
			</span>
		);
	} else {
		cite = <span>{props.source}</span>;
	}
	return (
		<blockquote>
			{props.children}
			{props.source.length > 0 && <cite>{cite}</cite>}
		</blockquote>
	);
}
