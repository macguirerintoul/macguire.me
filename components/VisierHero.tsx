import Image from "next/image";
import { motion } from "framer-motion";
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

const variants = {
	hidden: {
		opacity: 0,
		filter: "blur(10px)",
	},

	visible: {
		opacity: 1,
		filter: "blur(0px)",
		transition: { ease: "easeOut", duration: 1 },
	},
};

export default function VisierHero() {
	return (
		<div className="visier-hero">
			{images.map((image) => (
				<MotionImage
					key={image.name}
					variants={variants}
					initial="hidden"
					animate="visible"
					src={image.src}
					width={400}
					alt=""
					id={image.name}
				/>
			))}
		</div>
	);
}
