import MagicLink from "./magiclink";
import Tag from "./tag";
import { toDateString } from "../lib/utilities";
import React from "react";

class ListBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			context: "",
		};
	}

	render() {
		return (
			<div className="listblock">
				<div className="listblock-title">
					<MagicLink url={this.props.item.path}>
						<h2 className="link">{this.props.item.title}</h2>
					</MagicLink>
				</div>
				<p className="listblock-description">{this.props.item.description}</p>
			</div>
		);
	}
}

export default ListBlock;
