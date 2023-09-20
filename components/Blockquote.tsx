import { ReactElement, FunctionComponent } from "react";
import { MagicLink } from "./MagicLink";

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
		<figure className="mx-auto border-l-2 border-indigo-600 pl-8">
			<blockquote className="mb-8">{children}</blockquote>
			{source.length > 0 && (
				<figcaption className="text-right text-neutral-500">
					{source}
				</figcaption>
			)}
		</figure>
	);
};

export { Blockquote };
