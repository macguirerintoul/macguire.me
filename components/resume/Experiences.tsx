import React from "react";
import { ResumeType } from "types";
import { lengthOfService, getCalendarString } from "lib/resume";

const Experiences = ({
	experience,
}: {
	experience: ResumeType["experience"];
}) => {
	return experience.map((job) => {
		return (
			<div className="mb-12" key={job.organization}>
				<h3 className="mb-2 flex flex-col leading-tight min-[600px]:block">
					{job.organization}
					<span className="hidden whitespace-pre text-neutral-500 min-[600px]:inline">
						{" • "}
					</span>
					<span className="font-normal text-neutral-500">
						{lengthOfService(job.start, job.end)}
					</span>
				</h3>
				<p className="mb-4 leading-snug">{job.description}</p>
				<ul className="list-none pl-0 leading-snug text-neutral-500">
					{job.history.map((item) => {
						return (
							<li
								key={item.job}
								className="mb-2 flex flex-col min-[600px]:mb-0 min-[600px]:block sm:mb-0"
							>
								<span>{item.job}</span>
								<span className="hidden whitespace-pre min-[600px]:inline">
									{" • "}
								</span>
								<span>{getCalendarString(item.start, item.end)}</span>
							</li>
						);
					})}
				</ul>
			</div>
		);
	});
};

export default Experiences;
