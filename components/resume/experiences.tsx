import React from "react";
import { ResumeType } from "../../lib/types";

interface IResumeTime {
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
	experience: ResumeType["experience"];
}

class Experiences extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
		this.lengthOfService = this.lengthOfService.bind(this);
	}

	lengthOfService = (start: Date, end: Date): string => {
		const lenghInMonths: number =
			end.getMonth() -
			start.getMonth() +
			12 * (end.getFullYear() - start.getFullYear()) + 1;
		const years: number = Math.floor(lenghInMonths / 12);
		const months: number = lenghInMonths % 12;
		const yearString = `${years} ${years > 1 ? "years" : "year"}`;
		const monthString = `${months} ${months > 1 ? "months" : "month"}`;
		if (years === 0) {
			return `${monthString}`;
		} else {
			return `${yearString} ${monthString}`;
		}
	};

	getTimeString = (start: IResumeTime["start"], end: IResumeTime["end"]) => {
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
		const lengthOfService: string = this.lengthOfService(startDate, endDate);
		const timeString = `${lengthOfService} (${startString} – ${endString})`;
		return timeString;
	};

	render() {
		return this.props.experience.map((job) => {
			return (
				<div key={job.organization} className="resume-item">
					<h3>
						{job.organization} • {this.getTimeString(job.start, job.end)}
					</h3>
					<h4 className="resume-subtitle">{job.job}</h4>
					{job.description &&
						job.description.map((item) => {
							return (
								<p className="resume-responsibilities" key={item}>
									{item}
								</p>
							);
						})}
					{job.history &&
						job.history.map((item) => {
							return (
								<h4 className="resume-subtitle" key={item}>
									{item.job} • {this.getTimeString(item.start, item.end)}
								</h4>
							);
						})}
				</div>
			);
		});
	}
}

export default Experiences;
