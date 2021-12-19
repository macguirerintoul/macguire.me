import MagicImage from "./magicimage";
import Tag from "./tag";

export default function ProjectOverview(props) {
	return (
		<section className="overview">
			<h1>{props.project.title}</h1>
			<hr />
			{/* <div className="overview-header">
				{props.project.title} ✦ {props.project.year} ✦
				{props.project.tags.map((tag, index) => {
					return (
						<Tag key={tag}>
							{index != 0 && ","} {tag}
						</Tag>
					);
				})}
			</div> */}

			<p
				className="hero-paragraph"
				dangerouslySetInnerHTML={{ __html: props.project.summary }}
			/>
			<MagicImage
				className="overview-image"
				path={props.project.imagePath}
				alt={"Screenshot of " + props.project.title}
			/>
			{/* <div className="overview-context">
				<div className="overview-context-item">
					<span className="overview-context-label">For</span>
					<span className="overview-context-content">{props.project.for}</span>
				</div>
				<div className="overview-context-item">
					<span className="overview-context-label">Roles</span>
					<span className="overview-context-content">
						{props.project.roles.join(", ")}
					</span>
				</div>
				<div className="overview-context-item">
					<span className="overview-context-label">Tools</span>
					<span className="overview-context-content">
						{props.project.tools.join(", ")}
					</span>
				</div>
			</div> */}
		</section>
	);
}
