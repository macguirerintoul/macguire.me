import Image from "next/image";
import { motion } from "framer-motion";
import breakdown from "../content/images/visier/breakdown.webp";
import pipeline from "../content/images/visier/pipeline.webp";
import quadrant from "../content/images/visier/quadrant.webp";
import planning from "../content/images/visier/planning.webp";
import trend from "../content/images/visier/trend.webp";
import relationship from "../content/images/visier/relationship.webp";
import guy from "../content/images/visier/guy.webp";

const MotionImage = motion(Image);

const variants = {
	hidden: {
		opacity: 0,
		filter: "blur(10px)",
	},

	visible: {
		opacity: 1,
		filter: "blur(0px)",
		transition: { ease: "easeOut", duration: 2 },
	},
};

export default function VisierHero() {
	return (
		<div className="visier-hero">
			<MotionImage
				variants={variants}
				initial="hidden"
				animate="visible"
				id="breakdown"
				src={breakdown}
				alt=""
			/>
			<MotionImage
				variants={variants}
				initial="hidden"
				animate="visible"
				id="pipeline"
				src={pipeline}
				alt=""
			/>
			<MotionImage
				variants={variants}
				initial="hidden"
				animate="visible"
				id="quadrant"
				src={quadrant}
				alt=""
			/>
			<MotionImage
				variants={variants}
				initial="hidden"
				animate="visible"
				id="guy"
				src={guy}
				alt=""
			/>
			<MotionImage
				variants={variants}
				initial="hidden"
				animate="visible"
				id="planning"
				src={planning}
				alt=""
			/>
			<MotionImage
				variants={variants}
				initial="hidden"
				animate="visible"
				id="trend"
				src={trend}
				alt=""
			/>
			<MotionImage
				variants={variants}
				initial="hidden"
				animate="visible"
				id="relationship"
				src={relationship}
				alt=""
			/>
		</div>
	);
}
