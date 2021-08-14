import Layout from '../components/layout'
import ProjectOverview from '../components/projectoverview'
import PreviousNext from "../components/previousnext"; 
import TOC from '../components/TOC'
import { getAllWorkIds, getProjectData } from '../lib/work'
import Script from 'next/script'
import React from 'react'
import {attachMediumZoom} from '../lib/utilities'

export async function getStaticProps({ params }) {
  const projectData = await getProjectData(params.project)
  return {
    props: {
      projectData
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
			this.setState({headingsProject: this.props.projectData.title});
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
		this.currentProject = this.props.projectData.title;
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
				<ProjectOverview project={this.props.projectData} /> 
				<div className="content" dangerouslySetInnerHTML={{ __html: this.props.projectData.contentHtml }} />
				 
				{/* <PreviousNext type="project" previous={this.props.previous} next={this.props.next} /> */}
			</Layout>
		)
	}
}
export default Project