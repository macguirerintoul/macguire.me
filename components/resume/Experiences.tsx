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
		return `${startString} – ${endString}`;
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
				<div key={job.organization} className="resume-item">
					<h3 className="organization">
						{job.organization} • {this.lengthOfService(job.start, job.end)}
					</h3>
					{job.history &&
						job.history.map((item) => {
							return (
								<div key={item.job}>
									{item.description && (
										<p className="resume-responsibilities">
											{item.description}
										</p>
									)}
									<h4 className="resume-subtitle">
										{item.job} • {this.getCalendarString(item.start, item.end)}
									</h4>
								</div>
							);
						})}
				</div>
			);
		});
	}
}

export default Experiences;
