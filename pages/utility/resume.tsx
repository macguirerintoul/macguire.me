import ResumeComponent from "../../components/resume";
import ResumeBlock from "../../components/resumeblock";
import { getResumeData } from "../../lib/resume";
import { ResumeType } from "../../lib/types";

export async function getStaticProps() {
	const resume: ResumeType = getResumeData();
	return {
		props: {
			resume,
		},
	};
}

export default function Resume(props: { resume: ResumeType }) {
	return (
		<div className="resume-page">
			<h1>Macguire Rintoul</h1>
			<div className="sidebar">
				<div className="sideblock">
					<ResumeBlock h2="Skills">
						{props.resume.skills.map((skill) => (
							<div key={skill}>{skill}</div>
						))}
					</ResumeBlock>
				</div>
				<div className="sideblock">
					<ResumeBlock h2="Tools">
						{props.resume.tools.map((tool) => (
							<div key={tool}>{tool}</div>
						))}
					</ResumeBlock>
				</div>
				<div className="sideblock">
					<ResumeBlock h2="Interests">
						{props.resume.interests.map((interest) => (
							<div key={interest}>{interest}</div>
						))}
					</ResumeBlock>
				</div>
				<div className="sideblock">
					<ResumeBlock h2="Recognition">
						{props.resume.recognition.map((award) => (
							<div className="resume-item" key={award.title}>
								<h3 key={award.title}>{award.title}</h3>
								<h4 key={award.context}>{award.context}</h4>
							</div>
						))}
					</ResumeBlock>
				</div>
			</div>
			<div className="experience">
				<h2>Contact</h2>
				<div className="resume-item">
					<h3>macguire.me • email@macguire.me</h3>
				</div>
				<h2>Experience</h2>
				<ResumeComponent resume={props.resume} />
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
