import { Resume } from "components/resume/Resume";
import { getResumeData } from "lib/resume";
import type { ReactElement } from "react";

ResumePage.getLayout = function getLayout(page: ReactElement) {
	return <>{page}</>;
};

export default function ResumePage() {
	const resume = getResumeData();
	return (
		<div className="resume-page">
			<div className="header">
				<h1>Macguire Rintoul</h1>
			</div>
			<Resume resume={resume} />
		</div>
	);
}
