import Spacer from "./spacer";

export default function Resume(props) {
	return (
				props.resume.experience.map((job) => {
					return (
						<div key={job.title + job.organization} className="resume-item">
							<h3>
								{job.title} <Spacer /> {job.organization}
							</h3>
							<h4 className="resume-subtitle">{job.time}</h4>
							<ul className="resume-responsibilities">
								{job.description.map((item) => {
									return <li key={item}>{item}</li>;
								})}
							</ul>
						</div>
					);
				})
	);
}
