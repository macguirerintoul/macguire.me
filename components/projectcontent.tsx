import Layout from "./layout";
import ProjectOverview from "./projectoverview";
import ContentSwitcher from "./contentswitcher";
import MagicVideo from "./magicvideo"; 
import Script from "next/script";
import React from "react"; 
import { attachMediumZoom } from "../lib/utilities";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Blockquote from "./blockquote";
import Showcase from "./showcase";
import MagicImage from "./magicimage";
const components = { Blockquote, MagicVideo, Showcase, MagicImage };

class ProjectContent extends React.Component {
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
			let headings = document.querySelectorAll("h2,h3");
			this.setState({ headings: Array.from(headings) });
			this.setState({ headingsProject: this.props.project.meta.title });
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
		this.currentProject = this.props.project.meta.title;
		this.getHeadings();
		try {
			this.state.mediumZoom.detach(); // We need to detach all images here, otherwise they'll have several instances added to them and they'll all pop up
		} catch {
			console.log("no mz exists");
		}
		this.setState({ mediumZoom: attachMediumZoom() });
		this.createPreviousNext();
	};

	componentDidMount() {
		this.preparePage();
	}

	render() {
		return (
			<>
				<Script src="https://player.vimeo.com/api/player.js" />
				<ProjectOverview project={this.props.project.meta} />
				{!this.props.project.meta.parentProject && <ContentSwitcher
					handler={this.setContentState}
					contentState={this.state.contentState}
				/>}
				
				<hr />
				<div className="content">
					{this.state.contentState == "project" && (
						<MDXRemote {...this.props.project.content} components={components} />
					)}
					{this.state.contentState == "process" && (
						<MDXRemote {...this.props.project.process} components={components} />
					)}
				</div>
				{!this.props.project.meta.parentProject && <ContentSwitcher
					handler={this.setContentState}
					contentState={this.state.contentState}
				/>}
				{/* <PreviousNext type="project" previous={this.props.previous} next={this.props.next} /> */}
			</>
		);
	}
}
export default ProjectContent;
