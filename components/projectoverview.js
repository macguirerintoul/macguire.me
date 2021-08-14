import MagicImage from "./magicimage";
import Tag from "./tag";

export default function ProjectOverview(props) {
	return (
		<section className="overview">
		<div className="overview__main">
			<span className="overview__header" >{ props.project.title } ✦ { props.project.year } ✦
 				{project.tags.map(() => {
					return <Tag key={tag}> { tag }</Tag>
				} )}
			</span>
			
			<p className="overview__summary" dangerouslySetInnerHTML={props.project.summary} />
			<MagicImage
				className="overview__image"
				path={props.project.imagePath}
				alt={'Screenshot of ' + project.title}
			/>
			<div className="overview__context">
				<h1 className="overview__title">{ props.project.title }</h1>

				<table>
					<tr className="overview__context_item">
						<td className="overview__context_label">For</td>
						<td>{ props.project.for }</td>
					</tr>
					<tr className="overview__context_item">
						<td className="overview__context_label">Roles</td>
						<td>{ props.project.roles.join(", ") }</td>
					</tr>
					<tr className="overview__context_item">
						<td className="overview__context_label">Tools</td>
						<td>{ props.project.tools.join(", ") }</td>
					</tr>
				</table>
			</div>
			<hr />
		</div>
	</section>
	)
}
