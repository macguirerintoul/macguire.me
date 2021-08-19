import MagicImage from "./magicimage";
import Tag from "./tag";

export default function ProjectOverview(props) {
	return (
		<section className="overview">
			<div className="overview__main">
				<div className="overview__header">
					{props.project.title} ✦ {props.project.year} ✦
					{props.project.tags.map((tag, index) => {
						return (
							<Tag key={tag}>
								{index != 0 && ","} {tag}
							</Tag>
						);
					})}
				</div>

				<p
					className="overview__summary"
					dangerouslySetInnerHTML={{ __html: props.project.summary }}
				/>
				<MagicImage
					className="overview__image"
					path={props.project.imagePath}
					alt={"Screenshot of " + props.project.title}
				/>
				<div className="overview__context">
					<h1 className="overview__title">{props.project.title}</h1>
					<div className="overview__context_item">
						<span className="overview__context_label">For</span>
						<span className="overview__context_content">
							{props.project.for}
						</span>
					</div>
					<div className="overview__context_item">
						<span className="overview__context_label">Roles</span>
						<span className="overview__context_content">
							{props.project.roles.join(", ")}
						</span>
					</div>
					<div className="overview__context_item">
						<span className="overview__context_label">Tools</span>
						<span className="overview__context_content">
							{props.project.tools.join(", ")}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
