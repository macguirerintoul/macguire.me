import { ReactElement, FunctionComponent } from "react";
import { MagicLink } from "./index";

const Blockquote: FunctionComponent<{
	url?: string;
	source: string;
	children: ReactElement | string;
}> = ({ url, source, children }) => {
	let caption: ReactElement;
	if (url && url.length > 0) {
		caption = (
			<span>
				— <MagicLink url={url}>{source}</MagicLink>
			</span>
		);
	} else {
		caption = <span>{source}</span>;
	}
	return (
		<figure>
			<blockquote>{children}</blockquote>
			{source.length > 0 && <figcaption>{source}</figcaption>}
		</figure>
	);
};

export { Blockquote };
