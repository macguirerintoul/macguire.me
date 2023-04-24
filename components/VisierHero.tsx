import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import breakdown from "../content/images/visier/breakdown.webp";
import pipeline from "../content/images/visier/pipeline.webp";
import quadrant from "../content/images/visier/quadrant.webp";
import planning from "../content/images/visier/planning.webp";
import trend from "../content/images/visier/trend.webp";
import relationship from "../content/images/visier/relationship.webp";
import guy from "../content/images/visier/guy.webp";

const images = [
	{ src: breakdown, name: "breakdown" },
	{ src: pipeline, name: "pipeline" },
	{ src: quadrant, name: "quadrant" },
	{ src: planning, name: "planning" },
	{ src: trend, name: "trend" },
	{ src: relationship, name: "relationship" },
	{ src: guy, name: "guy" },
];

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

function useParallax(value: MotionValue<number>) {
	return useTransform(value, [0, 1], [0, 200]);
}

export default function VisierHero() {
	const { scrollYProgress } = useScroll();
	const ypos = useParallax(scrollYProgress);
	return (
		<div className="visier-hero">
			{images.map((image) => (
				<MotionImage
					key={image.name}
					variants={variants}
					initial="hidden"
					animate="visible"
					src={image.src}
					alt=""
					id={image.name}
					// style={{ y: ypos }}
				/>
			))}
		</div>
	);
}
