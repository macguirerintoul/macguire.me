import Layout from '../components/layout'
import ProjectOverview from '../components/projectoverview' 
import MagicVideo from '../components/magicvideo'
import { getAllWorkIds, getProjectData } from '../lib/work'
import Script from 'next/script'
import React from 'react'
import {attachMediumZoom} from '../lib/utilities'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize' 
import Blockquote from '../components/blockquote'
import Showcase from '../components/showcase'

import MagicImage from '../components/magicimage'
const components = {Blockquote,MagicVideo,Showcase,MagicImage} 

export async function getStaticProps({ params }) {
  const project = await getProjectData(params.project) 
	const mdxSource = await serialize(project.content);
	const process = await serialize(project.process);

  return {
    props: {
      meta: project.data,
			content: mdxSource,
			process: process
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllWorkIds()
  return {
    paths,
    fallback: false
  }
}

class Project extends React.Component  {
	constructor(props) {    
		super(props);    
		this.state = {
			mediumZoom: null,
			next: { title: "", path: "" },
			previous: { title: "", path: "" },
			headingsProject: "",
			currentProject: "",
			contentState: 'project',
			headings: []
		};  
	}

	getHeadings = () => {
		// Because this runs in updated, we need conditions or else this method will trigger another update which will call this method again, etc.
		if (
			this.state.headings.length === 0 ||
			this.state.headingsProject != this.state.currentProject
		) {
			let headings = document.querySelectorAll("h2,h3");
			this.setState({headings: Array.from(headings)});
			this.setState({headingsProject: this.props.meta.title});
		}
	}

	createPreviousNext = () => {
		// this.previous = this.$page.allProject.edges.filter(
		// 	item => item.node.title === this.$page.project.title
		// )[0].previous;
		// this.next = this.$page.allProject.edges.filter(
		// 	item => item.node.title === this.$page.project.title
		// )[0].next;
	}
	preparePage = () => {
		this.currentProject = this.props.meta.title;
		this.getHeadings();
		try {
			this.state.mediumZoom.detach(); // We need to detach all images here, otherwise they'll have several instances added to them and they'll all pop up
		} catch {
			console.log("no mz exists");
		}
		this.setState({mediumZoom: attachMediumZoom()});
		this.createPreviousNext();
	}

	componentDidMount() {
		this.preparePage()
	}

	render() { 
		return (
			<Layout>
				<Script src="https://player.vimeo.com/api/player.js" />
				<ProjectOverview project={this.props.meta} /> 
				<div className="content-switcher">
					<div onClick={() => this.setState({contentState: 'project'})}>Project</div>
					<div onClick={() => this.setState({contentState: 'process'})}>Process</div>
				</div>
				<hr />
				<div className="content">
					{this.state.contentState == 'project' && <MDXRemote {...this.props.content} components={components} />}
					{this.state.contentState == 'process' && <MDXRemote {...this.props.process} components={components} />}
				</div>
				 
				{/* <PreviousNext type="project" previous={this.props.previous} next={this.props.next} /> */}
			</Layout>
		)
	}
}
export default Project