import MagicLink from "./magiclink";
import * as React from "react";

interface IProps {
	title: string;
	url: string;
	description: string;
}

const ListBlock = React.forwardRef<
	HTMLDivElement,
	React.PropsWithChildren<IProps>
>((props: IProps, ref) => (
	<div className="listblock" ref={ref}>
		<div className="listblock-title">
			<MagicLink url={props.url}>{props.title}</MagicLink>
		</div>
		<p className="listblock-description">{props.description}</p>
	</div>
));

ListBlock.displayName = "ListBlock";

export default ListBlock;
