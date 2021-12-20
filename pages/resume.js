import ResumeComponent from "../components/resume"
import { getResume } from "../lib/resume"; 
import MagicLink from "../components/MagicLink"

export async function getStaticProps() {
	const resume = getResume();
	return {
		props: {
			resume,
		},
	};
}

export default function Resume({resume}) {
	return (
		<div className="resume-page">
      <h1>Macguire Rintoul</h1>
			<div className="sidebar">
				<MagicLink url="https://macguire.me">macguire.me</MagicLink>
				<MagicLink url="mailto:email@macguire.me">email@macguire.me</MagicLink>
				<h2>Skills</h2>
				{resume.skills.map(skill => (<div key={skill}>{skill}</div>))}
				<h2>Tools</h2>
				{resume.tools.map(tool => (<div key={tool}>{tool}</div>))}
				<h2>Interests</h2>
				{resume.interests.map(interest => (<div key={interest}>{interest}</div>))}
				<h2>Education</h2>
				<div>BSc, Design from SFU</div> 
				<div>Grad. 2020 with distinction</div> 
			</div>
			<div className="experience">
				<h2>Experience</h2>
      	<ResumeComponent resume={resume} />
			</div>
    </div>
  )
}