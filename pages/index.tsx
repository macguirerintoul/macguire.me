import Head from "next/head";
import { GetStaticProps } from "next";
import { motion } from "framer-motion";
import { list, itemVariants } from "../lib/utilities";
import MotionListBlock from "../components/motion-list-block";
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
export default function Home(props: {
	projectSummaries: ProjectSummaryInterface[];
}) {
	return (
		<>
			<Head>
				<title>Macguire Rintoul, Experience Designer</title>
				<link
					rel="icon"
					href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥴</text></svg>"
				/>
			</Head>
			<p className="intro">d(-_-)b</p>
			<motion.section
				className="listblock-list"
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
