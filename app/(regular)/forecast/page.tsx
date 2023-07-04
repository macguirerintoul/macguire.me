import { titleTemplate } from "lib/utilities";
import { Metadata } from "next";
import { Showcase, MagicVideo } from "components";

export const metadata: Metadata = {
	title: "Forecast " + titleTemplate,
};

const Forecast = async () => {
	return (
		<>
			<section>
				<h1>Forecast</h1>
				<MagicVideo
					className="forecast-video"
					path="Forecast/videos/demo2"
					source="cloudinary"
				/>
				<h2>Highlights</h2>
				<ul>
					<li>designed, developed, and published an open-source desktop app</li>
					<li>learned Vue and Electron</li>
					<li>got dark mode working 😎</li>
				</ul>
				<h2>Opportunity</h2>
				One day in 2019, I found myself with several tasks to complete across
				work, school, and my personal life. Some of them were big, some of them
				were small. I wanted to know how long I had to complete each of them, so
				I could prioritize accordingly. While there are plenty of apps that make
				lists, there were none that I knew of that count down to a due date. I
				decided to learn Vue and Electron and make myself an app.
				<h2>Outcome</h2>
				<p>
					<a href="https://forecast.macguire.me">Forecast</a> is a
					cross-platform desktop app that helps manage tasks. That&apos;s really
					all there is to it.
				</p>
				<Showcase
					alt="forecast"
					path="Forecast/videos/demo2"
					type="video"
					source="cloudinary"
					orientation="media-right"
					content="Add tasks to your to-do list, and Forecast shows you the time remaining until each one is due."
				/>
			</section>
		</>
	);
};

export default Forecast;
