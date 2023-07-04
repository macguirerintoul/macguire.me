"use client";
import React from "react";
import { Resume } from "types";

interface ResumeTime {
	start: {
		year: number;
		month: number;
	};
	end?: {
		year?: number;
		month?: number;
	};
}

interface IProps {
	experience: Resume["experience"];
}

class Experiences extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.lengthOfService = this.lengthOfService.bind(this);
	}

	lengthOfService = (
		start: ResumeTime["start"],
		end: ResumeTime["end"]
	): string => {
		const startDate = new Date(start.year, start.month - 1);
		let endDate: Date = new Date();
		if (typeof end !== "undefined" && end["year"] && end["month"]) {
			endDate = new Date(end.year, end.month - 1);
		}
		const lenghInMonths: number =
			endDate.getMonth() -
			startDate.getMonth() +
			12 * (endDate.getFullYear() - startDate.getFullYear()) +
			1;
		const years: number = Math.floor(lenghInMonths / 12);
		const months: number = lenghInMonths % 12;
		const yearString = `${years} ${years > 1 ? "years" : "year"}`;
		const monthString =
			months > 1 ? `${months} ${months > 1 ? "months" : "month"}` : "";
		if (years === 0) {
			return `${monthString}`;
		} else {
			return `${yearString} ${monthString}`;
		}
	};

	getCalendarString = (start: ResumeTime["start"], end: ResumeTime["end"]) => {
		const startDate = new Date(start.year, start.month - 1);
		const startString = startDate.toLocaleString(undefined, {
			month: "long",
			year: "numeric",
		});
		let endDate: Date = new Date();
		if (typeof end !== "undefined" && end["year"] && end["month"]) {
			endDate = new Date(end.year, end.month - 1);
		}
		const endString: string =
			typeof end === "undefined"
				? "present"
				: endDate.toLocaleString(undefined, { month: "long", year: "numeric" });
		return `${startString}–${endString}`;
	};

	getTimeString = (start: ResumeTime["start"], end: ResumeTime["end"]) => {
		const startDate = new Date(start.year, start.month - 1);
		const startString = startDate.toLocaleString(undefined, {
			month: "long",
			year: "numeric",
		});
		let endDate: Date = new Date();
		if (typeof end !== "undefined" && end["year"] && end["month"]) {
			endDate = new Date(end.year, end.month - 1);
		}
		const endString: string =
			typeof end === "undefined"
				? "present"
				: endDate.toLocaleString(undefined, { month: "long", year: "numeric" });
		const lengthOfService: string = this.lengthOfService(start, end);
		const timeString = `${lengthOfService} (${startString} – ${endString})`;
		return timeString;
	};

	render() {
		return this.props.experience.map((job) => {
			return (
				<div className="mb-12" key={job.organization}>
					<h3 className="mb-2 flex flex-col leading-tight min-[600px]:block">
						{job.organization}
						<span className="hidden whitespace-pre text-neutral-500 min-[600px]:inline">
							{" • "}
						</span>
						<span className="text-neutral-500">
							{this.lengthOfService(job.start, job.end)}
						</span>
					</h3>
					<p className="mb-4 leading-snug">{job.description}</p>
					<ul className="list-none pl-0 leading-tight text-neutral-500">
						{job.history.map((item) => {
							return (
								<li
									key="item.job"
									className="mb-2 flex flex-col min-[600px]:mb-0 min-[600px]:block sm:mb-0"
								>
									<span>{item.job}</span>
									<span className="hidden whitespace-pre min-[600px]:inline">
										{" • "}
									</span>
									<span>{this.getCalendarString(item.start, item.end)}</span>
								</li>
							);
						})}
					</ul>
				</div>
			);
		});
	}
}

export default Experiences;
