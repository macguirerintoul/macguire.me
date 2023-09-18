"use client";
import Image from "next/image";
import {
	motion,
	useScroll,
	useTransform,
	MotionValue,
	useReducedMotion,
} from "framer-motion";
import actualDirectCompensation from "../images/visier/actual-direct-compensation.svg";
import applicantHireEvents from "../images/visier/applicant-hire-events.svg";
import predictedResignationRate from "../images/visier/predicted-resignation-rate.svg";
import breakdownBudgetAllocation from "../images/visier/breakdown-budget-allocation.svg";
import skillsAutomation2 from "../images/visier/skills-automation-2.svg";
import absenceToWorkedHours from "../images/visier/absence-to-worked-hours.svg";
import promotionEventsRate from "../images/visier/promotion-events-rate.svg";
import predictedResignationRateNextYear from "../images/visier/predicted-resignation-rate-next-year.svg";

const images = [
	{
		src: promotionEventsRate,
		name: "promotion-events-rate",
	},
	{
		src: absenceToWorkedHours,
		name: "absence-to-worked-hours",
	},
	{
		src: actualDirectCompensation,
		name: "actual-direct-compensation",
	},
	{
		src: applicantHireEvents,
		name: "applicant-hire-events",
	},
	{
		src: breakdownBudgetAllocation,
		name: "breakdown-budget-allocation",
	},
	{
		src: predictedResignationRate,
		name: "predicted-resignation-rate",
	},
	{
		src: predictedResignationRateNextYear,
		name: "predicted-resignation-rate-next-year",
	},
	{
		src: skillsAutomation2,
		name: "skills-automation2",
	},
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
			delayChildren: 0.4,
			staggerChildren: 0.4,
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

const VisierHero = () => {
	const { scrollYProgress } = useScroll();
	const y = useParallax(scrollYProgress);
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={container}
			className="visier-hero"
			// disable parallax if prefers-reduced-motion
			style={{ y: useReducedMotion() ? 0 : y }}
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
};

export { VisierHero };
