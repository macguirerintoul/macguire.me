import Spacer from "./spacer"; 

export default function Resume(props) {
	return (
		<section className="content">
		<div>{/*<!-- I set up content to be 3 column grid... this is weird -->*/}</div>
		<div className="resume">
			<h2>Experience</h2>
			{props.resume.map(job => {
				return (
				<div key={job.title + job.organization} className="resume__item">
					<h3>{ job.title } <Spacer /> { job.organization }</h3>
					<h4 className="resume__subtitle">
						{ job.time }
					</h4>
					<ul className="resume__responsibilities">
						{job.description.map(item => {
							return <li key={item}>{item}</li>
						})}
					</ul>
				</div>)
			})} 
			</div> 
	</section>
	)
}