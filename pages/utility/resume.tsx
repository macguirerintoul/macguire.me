import ResumeComponent from "../../components/resume";
import { getResumeData } from "../../lib/resume";

export async function getStaticProps() {
	const resume = getResumeData();
	return {
		props: {
			resume,
		},
	};
}

export default function Resume({ resume }) {
	return (
		<div className="resume-page">
			<h1>Macguire Rintoul</h1>
			<div className="sidebar">
				<div className="sideblock">
					<h2>Skills</h2>
					{resume.skills.map((skill) => (
						<div key={skill}>{skill}</div>
					))}
				</div>
				<div className="sideblock">
					<h2>Tools</h2>
					{resume.tools.map((tool) => (
						<div key={tool}>{tool}</div>
					))}
				</div>
				<div className="sideblock">
					<h2>Interests</h2>
					{resume.interests.map((interest) => (
						<div key={interest}>{interest}</div>
					))}
				</div>
				<div className="sideblock">
					<h2>Recognition</h2>
					{resume.recognition.map(award => (
						<div className="resume-item" key={award.title}>
							<h3 key={award.title}>{award.title}</h3>
							<h4 key={award.context}>{award.context}</h4>
						</div>
					))}
				</div>
			</div>
			<div className="experience">
				<h2>Contact</h2>
				<div className="resume-item">
					<h3>macguire.me • email@macguire.me</h3>
				</div>
				<h2>Experience</h2>
				<ResumeComponent resume={resume} />
				<h2>Education</h2>
				<div className="resume-item">
					<h3>BSc, Interactive Arts & Technology</h3>
					<h4>Simon Fraser University</h4>
					<p>Graduated December 2020 with distinction</p>
				</div>
				
			</div>
		</div>
	);
}
