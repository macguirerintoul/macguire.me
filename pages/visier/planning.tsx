import Image from "next/image";
import planning from "../../content/images/visier/planning.png";
import planningDeck from "../../content/images/visier/planning-deck.png";
import Zoom from "react-medium-image-zoom";

const Planning = () => {
	return (
		<>
			<section className="hero">
				<h1>Custom Planning Models</h1>
				<p>
					To extend Visier&apos;s workforce planning app to support all kinds of
					enterprise planning, we needed to enable the creation of new
					&quot;models&quot; to define how plans would behave.
				</p>
			</section>
			<Zoom>
				<Image src={planning} alt="Screenshot of Visier People: Planning" />
			</Zoom>
			<p>
				Visier People: Planning is a workforce planning app that integrates
				seamlessly with the rest of Visier People.
			</p>

			<p>
				In 2022, expanding our Planning offerings became a strategic priority
				for Visier. To do this, we integrated Planning with Studio, the
				configuration surface for Visier People. This allowed our Solutions team
				to build for Planning, and for those solutions to be customizable to
				each organization&apos;s needs.
			</p>
			<p>
				My role was to deliver impactful UX improvements with minimal resources
				to enable the creation of new Planning models.
			</p>
			<Image
				src={planningDeck}
				alt="Presentation slides showing my approach to the project"
			/>
			<p>
				Some models had been created, mostly by the developers who built the
				system. I spent a few weeks studying workforce planning and learning
				about the modelling workflow from our internal teams.
			</p>
			<p>
				Only a few people had experience editing models, but that was plenty to
				identify countless areas for improvement.
			</p>
			<p>Common themes included:</p>
			<ul>
				<li>lack of guidance</li>
				<li>invisible errors</li>
				<li>opaque configuration settings</li>
				<li>no documentation or in-app help</li>
				<li>many, many more</li>
			</ul>
			<p>
				Over the next while, a small team of developers and I shipped projects
				including:
			</p>
			<ul>
				<li>in-app explanation for every configuration setting</li>
				<li>a model validator</li>
				<li>wizard workflow for creating parts of a model</li>
				<li>
					cleaning up and consolidating settings, inferring automatically where
					possible
				</li>
				<li>error prevention throughout the interface</li>
				<li>terminology improvements</li>
				<li>smart defaults</li>
			</ul>
			<p>
				One of the biggest UX improvements we made was the model validator.
				Model editing is an iterative process, but the feedback cycle for
				Planning models was lengthy and uncertain. It involved previewing the
				model and creating a Plan, which could take up to 15 seconds (on a good
				day). If any part of the model was invalid, the model would simply not
				appear, and the editor would be left to their own devices to figure out
				what, and where, the problem was.
			</p>
		</>
	);
};

export default Planning;
