import Resume from "../../components/resume/resume";
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

export default function ResumePage(props: { resume: ResumeType }) {
	return (
		<div className="resume-page">
			<h1>Macguire Rintoul</h1>
			<Resume resume={props.resume} />
		</div>
	);
}
