import MagicLink from "./magiclink";
import React from "react";

class ListBlock extends React.Component<{
	title: string;
	url: string;
	description: string;
}> {
	render() {
		return (
			<div className="listblock">
				<div className="listblock-title">
					<MagicLink url={this.props.url}>{this.props.title}</MagicLink>
				</div>
				<p className="listblock-description">{this.props.description}</p>
			</div>
		);
	}
}

export default ListBlock;
