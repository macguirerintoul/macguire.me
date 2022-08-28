import Head from "next/head";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { ListBlock } from "../components";
import { getAllProjectSummaries } from "../lib/content";
import { ProjectSummaryInterface } from "../lib/types";

export const getStaticProps: GetStaticProps = async () => {
	const projectSummaries: ProjectSummaryInterface[] = getAllProjectSummaries();

	return {
		props: {
			projectSummaries,
		},
	};
};

const list = {
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
	hidden: {
		opacity: 1,
	},
};

const itemVariants = {
	visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
	hidden: { opacity: 0, y: 60 },
};

const MotionListBlock = motion(ListBlock);

export default function Home(props: {
	projectSummaries: ProjectSummaryInterface[];
}) {
	return (
		<>
			<Head>
				<title>Macguire Rintoul</title>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥴</text></svg>"
				/>
			</Head>
			<p className="intro">d(-_-)b</p>
			<motion.section
				className="project-list"
				initial="hidden"
				animate="visible"
				variants={list}
			>
				{props.projectSummaries.map((item: ProjectSummaryInterface) => (
					<MotionListBlock
						key={item.title}
						title={item.title}
						url={item.url}
						description={item.description}
						variants={itemVariants}
					/>
				))}
			</motion.section>
		</>
	);
}
