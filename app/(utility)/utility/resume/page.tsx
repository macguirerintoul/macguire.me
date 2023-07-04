import { Resume } from "components/resume/Resume";
import { getResumeData } from "lib/resume";

export default function ResumePage() {
	const resume = getResumeData();
	return (
		<div className="resume-page grid w-[8.5in] grid-cols-12 gap-8 p-12 text-base">
			<div className="col-span-12 mb-2">
				<h1 className="text-5xl font-light tracking-tight">Macguire Rintoul</h1>
			</div>
			<Resume resume={resume} />
		</div>
	);
}
