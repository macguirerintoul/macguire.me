import React from "react";

class Resume extends React.Component {
	constructor(props) {
		super(props);
		this.lengthOfService = this.lengthOfService.bind(this);
	}

	lengthOfService = (start, end) => {
		const lenghInMonths =
			end.getMonth() -
			start.getMonth() +
			12 * (end.getFullYear() - start.getFullYear());
		const years = Math.floor(lenghInMonths / 12);
		const months = lenghInMonths % 12;
		const yearString = `${years} ${years > 1 ? "years" : "year"}`;
		const monthString = `${months} ${months > 1 ? "months" : "month"}`;
		return `${yearString} ${monthString}`;
	};

	getTimeString = (start, end) => {
		const startDate = new Date(start.year, start.month - 1);
		const startString = startDate.toLocaleString(undefined, {
			month: "long",
			year: "numeric",
		});
		const endDate =
			typeof end === "undefined"
				? new Date()
				: new Date(end.year, end.month - 1);
		const endString =
			typeof end === "undefined"
				? "present"
				: endDate.toLocaleString(undefined, { month: "long", year: "numeric" });
		const lengthOfService = this.lengthOfService(startDate, endDate);
		const timeString = `${lengthOfService} (${startString} – ${endString})`;
		return timeString;
	};

	render() {
		return this.props.resume.experience.map((job) => {
			return (
				<div key={job.organization} className="resume-item">
					<h3>
						{job.organization} • <span className="job-name">{job.job}</span>
					</h3>
					<h4 className="resume-subtitle">
						{this.getTimeString(job.start, job.end)}
					</h4>
					{job.description &&
						job.description.map((item) => {
							return (
								<p className="resume-responsibilities" key={item}>
									{item}
								</p>
							);
						})}
				</div>
			);
		});
	}
}

export default Resume;
