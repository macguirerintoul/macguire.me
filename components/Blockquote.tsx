import { ReactElement, FunctionComponent } from "react";
import { MagicLink } from "./index";

const Blockquote: FunctionComponent<{
	url?: string;
	source: string;
	children: ReactElement | string;
}> = ({ url, source, children }) => {
	let cite: ReactElement;
	if (url && url.length > 0) {
		cite = (
			<span>
				— <MagicLink url={url}>{source}</MagicLink>
			</span>
		);
	} else {
		cite = <span>{source}</span>;
	}
	return (
		<blockquote>
			{children}
			{source.length > 0 && <cite>{cite}</cite>}
		</blockquote>
	);
};

export default Blockquote;