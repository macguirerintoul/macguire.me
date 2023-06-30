"use client";
import Image from "next/image";

import Zoom from "react-medium-image-zoom";
import pie from "public/images/pie.jpg";

const PieCharts = () => {
	return (
		<>
			<section className="hero">
				<h1>Pie Charts</h1>
			</section>
			<section>
				<Zoom>
					<Image
						src={pie}
						placeholder="blur"
						alt="Screenshot of the Contribution visual in Visier People"
					/>
				</Zoom>
			</section>
		</>
	);
};

export default PieCharts;
