import Layout from '../components/layout'
import ProjectOverview from '../components/projectoverview'
import PreviousNext from "~/components/previousnext";
import TOC from "~/components/toc";
import { getAllWorkIds, getPostData } from '../lib/work'
import Script from 'next/script'

export async function getStaticProps({ params }) {
  const postData = getPostData(params.project)
  return {
    props: {
      postData
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
			this.headings.length === 0 ||
			this.headingsProject != this.currentProject
		) {
			let headings = document.querySelectorAll("h2,h3");
			this.headings = Array.from(headings);
			this.headingsProject = this.$page.project.title;
		}
	}

	createPreviousNext = () => {
		this.previous = this.$page.allProject.edges.filter(
			item => item.node.title === this.$page.project.title
		)[0].previous;
		this.next = this.$page.allProject.edges.filter(
			item => item.node.title === this.$page.project.title
		)[0].next;
	}
	preparePage = () => {
		this.currentProject = this.$page.project.title;
		this.getHeadings();
		try {
			this.mediumZoom.detach(); // We need to detach all images here, otherwise they'll have several instances added to them and they'll all pop up
		} catch {
			console.log("no mz exists");
		}
		this.mediumZoom = attachMediumZoom();
		this.createPreviousNext();
	}

	componentDidMount() {
		this.preparePage()
	}

	render() {
		return (
			<Layout>
				<Script src="https://player.vimeo.com/api/player.js" />
				<ProjectOverview project={project} />
				<div className="content">
					<div className="toc-container">
						<TOC headings={headings} />
					</div>
					<VueRemarkContent className="content__main" />
				</div>
				<PreviousNext type="project" previous={previous} next={next} />
			</Layout>
		)
	}
}
