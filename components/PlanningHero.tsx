"use client";
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
	return useTransform(value, [0, 1], [0, 1200]);
}

const container = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: {
		filter: "blur(10px)",
	},

	visible: {
		filter: "blur(0px)",
		transition: { ease: "easeOut", duration: 0.1 },
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
			className="relative -z-10 mx-auto my-16 mb-36 flex h-140 justify-between"
		>
			<MotionImage
				variants={itemVariants}
				style={{ y: useReducedMotion() ? 0 : y }}
				src={headcountPlan}
				alt="Headcount plan"
				className="height-[60%] top-0 my-8"
			/>
			<MotionImage
				variants={itemVariants}
				style={{ y: useReducedMotion() ? 0 : y }}
				src={assignSubplan}
				alt="Headcount plan"
				className="height-[60%] top-0 my-8"
			/>
			<MotionImage
				variants={itemVariants}
				src={fiscalYear}
				alt="Headcount plan"
				className="height-full absolute left-1/2 top-8 my-8 translate-x-[-50%]"
			/>
		</motion.div>
	);
};

export { PlanningHero };
