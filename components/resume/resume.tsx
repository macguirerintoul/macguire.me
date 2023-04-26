import React, { ReactNode } from "react";
import { ResumeType } from "../../lib/types";
import ResumeSection from "./resumesection";

export default function Resume(props: {
	resume: ResumeType;
	showContact?: boolean;
}) {
	return (
		<>
			<div className="resume-sidebar">
				<ResumeSection title="Skills" items={props.resume.skills} />
				<ResumeSection title="Tools" items={props.resume.tools} />
				<ResumeSection title="Interests" items={props.resume.interests} />
				<ResumeSection
					title="Recognition"
					recognition={props.resume.recognition}
				/>
			</div>
			<div className="resume-main">
				{props.showContact && (
					<ResumeSection
						title="Contact"
						items={["macguire.me • macguire.rintoul@gmail.com"]}
					/>
				)}

				<ResumeSection
					title="Experience"
					experience={props.resume.experience}
				/>
				<ResumeSection title="Education" education={props.resume.education} />
			</div>
		</>
	);
}

Resume.getLayout = function getLayout(page: ReactNode) {
	return page;
};
