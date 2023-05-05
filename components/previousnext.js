import MagicLink from "./magiclink";

export default function PreviousNext(props) {
	return (
		<div className="previous-next">
			<div className="previous-next__previous">
				<label v-if="previous !== null">← Previous {props.type}</label>
				<MagicLink v-if="previous !== null" to="previous.path">
					{props.previous.title}
				</MagicLink>
			</div>
			<div className="previous-next__next">
				<label v-if="next !== null">Next {props.type} →</label>
				<MagicLink v-if="next !== null" to="next.path">
					{props.next.title}
				</MagicLink>
			</div>
		</div>
	);
}
