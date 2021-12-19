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
			<div class="sidebar">
				<MagicLink url="https://macguire.me">macguire.me</MagicLink>
				<MagicLink url="mailto:email@macguire.me">email@macguire.me</MagicLink>
				<h2>Skills</h2>
			{resume.skills.map(skill => (<li>{skill}</li>))}
			</div>
			<div class="experience">
				<h2>Experience</h2>
      	<ResumeComponent resume={resume} />
			</div>
    </div>
  )
}