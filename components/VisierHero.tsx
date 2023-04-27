import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import collaborationAnalytics from "../content/images/visier/collaboration-analytics.png";
import customerExperience from "../content/images/visier/customer-experience-hero.png";
import peopleAnalytics from "../content/images/visier/people-analytics.png";
import talentAcquisition from "../content/images/visier/talent-acquisition.png";
import demoCTA from "../content/images/visier/demo-cta-v2.webp";
import finServ from "../content/images/visier/finserv-hero.webp";
import hospitality from "../content/images/visier/hospitality-hero.webp";

const images = [
	{ src: collaborationAnalytics, name: "collaborationAnalytics" },
	{ src: customerExperience, name: "customerExperience" },
	{ src: peopleAnalytics, name: "peopleAnalytics" },
	{ src: talentAcquisition, name: "talentAcquisition" },
	{ src: demoCTA, name: "demoCTA" },
	{ src: finServ, name: "finServ" },
	{ src: hospitality, name: "hospitality" },
];

const MotionImage = motion(Image);

function useParallax(value: MotionValue<number>) {
	return useTransform(value, [0, 1], [0, 200]);
}

const container = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 30,
		filter: "blur(10px)",
	},

	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: { ease: "easeOut", duration: 1 },
	},
};

export default function VisierHero() {
	const { scrollYProgress } = useScroll();
	const y = useParallax(scrollYProgress);
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={container}
			className="visier-hero"
			style={{ y }}
		>
			{images.map((image) => (
				<MotionImage
					key={image.name}
					variants={itemVariants}
					src={image.src}
					width={400}
					alt=""
					id={image.name}
				/>
			))}
		</motion.div>
	);
}
