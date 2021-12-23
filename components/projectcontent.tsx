import ProjectOverview from "./projectoverview";
import ContentSwitcher from "./contentswitcher";
import MagicVideo from "./magicvideo"; 
import Script from "next/script";
import React, { ReactElement } from "react";  
import { Project } from "../lib/types";
import { MDXRemote } from "next-mdx-remote"; 
import Blockquote from "./blockquote";
import Showcase from "./showcase";
import MagicImage from "./magicimage";
const components = { Blockquote, MagicVideo, Showcase, MagicImage };

type PropsType = {
	projectData: Project
}

type StateType = {
	mediumZoom: null;
	next: { title: "", path: "" };
	previous: { title: "", path: "" };
	headingsProject: string;
	currentProject: string;
	contentState: "project";
	headings: Array<object>;
}

class ProjectContent extends React.Component<PropsType, StateType> {
	constructor(props) {
		super(props);
		this.state = {
			mediumZoom: null,
			next: { title: "", path: "" },
			previous: { title: "", path: "" },
			headingsProject: "",
			currentProject: "",
			contentState: "project",
			headings: [],
		};
	}

	setContentState = (newContentState) => {
		this.setState({
			contentState: newContentState,
		});
	};

	getHeadings = () => {
		// Because this runs in updated, we need conditions or else this method will trigger another update which will call this method again, etc.
		if (
			this.state.headings.length === 0 ||
			this.state.headingsProject != this.state.currentProject
		) {
			const headings = document.querySelectorAll("h2,h3");
			this.setState({ headings: Array.from(headings) });
			this.setState({ headingsProject: this.props.projectData.meta.title });
		}
	};

	createPreviousNext = () => {
		// this.previous = this.$page.allProject.edges.filter(
		// 	item => item.node.title === this.$page.project.title
		// )[0].previous;
		// this.next = this.$page.allProject.edges.filter(
		// 	item => item.node.title === this.$page.project.title
		// )[0].next;
	};
	preparePage = () => {
		// this.setState({"currentProject": this.props.projectData.meta.title})
		// this.getHeadings();
		// try {
		// 	this.state.mediumZoom.detach(); // We need to detach all images here, otherwise they'll have several instances added to them and they'll all pop up
		// } catch {
		// 	console.log("no mz exists");
		// }
		// this.setState({ mediumZoom: attachMediumZoom() });
		// this.createPreviousNext();
	};

	componentDidMount() {
		this.preparePage();
	}

	render() {
		let content: ReactElement;
		if (this.state.contentState == "project") {
			content = (<MDXRemote {...this.props.projectData.mdxProject} components={components} />)
		} else if  (this.state.contentState == "process") {
			content = (<MDXRemote {...this.props.projectData.mdxProcess} components={components} />)
		}

		return (
			<>
				<Script src="https://player.vimeo.com/api/player.js" />
				<ProjectOverview project={this.props.projectData.meta} />
				{!this.props.projectData.meta.parentProject && <ContentSwitcher
					handler={this.setContentState}
					contentState={this.state.contentState}
				/>}
				
				<hr />
				<div className="content">
					{content}
				</div>
				{!this.props.projectData.meta.parentProject && <ContentSwitcher
					handler={this.setContentState}
					contentState={this.state.contentState}
				/>}
				{/* <PreviousNext type="project" previous={this.props.previous} next={this.props.next} /> */}
			</>
		);
	}
}
export default ProjectContent;
