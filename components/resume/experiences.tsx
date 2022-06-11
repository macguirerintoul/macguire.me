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

	lengthOfService = (
		start: IResumeTime["start"],
		end: IResumeTime["end"]
	): string => {
		const startDate = new Date(start.year, start.month - 1);
		const startString = startDate.toLocaleString(undefined, {
			month: "long",
			year: "numeric",
		});
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
		const monthString = `${months} ${months > 1 ? "months" : "month"}`;
		if (years === 0) {
			return `${monthString}`;
		} else {
			return `${yearString} ${monthString}`;
		}
	};

	getCalendarString = (
		start: IResumeTime["start"],
		end: IResumeTime["end"]
	) => {
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
		const lengthOfService: string = this.lengthOfService(start, end);
		const timeString = `${lengthOfService} (${startString} – ${endString})`;
		return timeString;
	};

	render() {
		return this.props.experience.map((job) => {
			return (
				<div key={job.organization} className="resume-item">
					<h3>
						{job.organization} • {this.lengthOfService(job.start, job.end)}
					</h3>
					{job.history &&
						job.history.map((item) => {
							return (
								<div key={item}>
									<h4 className="resume-subtitle" key={item}>
										{item.job} • {this.getCalendarString(item.start, item.end)}
									</h4>
									{item.description && (
										<p className="resume-responsibilities" key={item}>
											{item.description}
										</p>
									)}
								</div>
							);
						})}
				</div>
			);
		});
	}
}

export default Experiences;
