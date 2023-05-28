import React from "react";
class ContentSwitcher extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="content-switcher">
				<button
					className={`${this.props.contentState == "project" ? "active" : ""}`}
					onClick={() => this.props.handler("project")}
				>
					Project
				</button>
				<button
					className={`${this.props.contentState == "process" ? "active" : ""}`}
					onClick={() => this.props.handler("process")}
				>
					Process
				</button>
			</div>
		);
	}
}
export { ContentSwitcher };
