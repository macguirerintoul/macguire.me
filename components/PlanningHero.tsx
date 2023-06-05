import Image from "next/image";
import headcountPlan from "images/visier/headcount-plan.svg";
import assignSubplan from "images/visier/ui-assign-subplan.svg";
import fiscalYear from "images/visier/ui-fiscal-year-timeline-plan.svg";
import {
	motion,
	useScroll,
	useTransform,
	MotionValue,
	useReducedMotion,
} from "framer-motion";

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

const PlanningHero = () => {
	const { scrollYProgress } = useScroll();
	const y = useParallax(scrollYProgress);
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={container}
			className="planning-hero"
			// disable parallax if prefers-reduced-motion
			style={{ y: useReducedMotion() ? 0 : y }}
		>
			<MotionImage src={headcountPlan} alt="Headcount plan" />
			<MotionImage src={assignSubplan} alt="Headcount plan" />
		</motion.div>
	);
};

export { PlanningHero };
