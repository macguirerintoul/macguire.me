import Resume from "../../components/resume/Resume";
import { getResumeData } from "../../lib/resume";
import { ResumeType } from "../../lib/types";
import type { ReactElement } from "react";

export async function getStaticProps() {
	const resume: ResumeType = getResumeData();
	return {
		props: {
			resume,
		},
	};
}

ResumePage.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

export default function ResumePage(props: { resume: ResumeType }) {
	return (
		<div className="resume-page">
			<div className="header">
				<h1>Macguire Rintoul</h1>
			</div>
			<Resume resume={props.resume} />
		</div>
	);
}
