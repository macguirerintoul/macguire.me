import React from "react";
import { ResumeType } from "types";
import ResumeSection from "./ResumeSection";

const Resume = (props: { resume: ResumeType; showContact?: boolean }) => {
	return (
		<>
			<div className="col-span-4">
				<ResumeSection title="Skills" items={props.resume.skills} />
				<ResumeSection title="Tools" items={props.resume.tools} />
				<ResumeSection title="Interests" items={props.resume.interests} />
				<ResumeSection
					title="Recognition"
					recognition={props.resume.recognition}
				/>
			</div>
			<div className="col-span-8 col-start-5">
				{props.showContact && (
					<ResumeSection
						title="Contact"
						items={["macguire.me • e@macguire.me"]}
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
};

export { Resume };
