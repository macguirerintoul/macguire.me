"use client";
import Image from "next/image";
import planningDeck from "images/visier/planning-deck.png";
import Zoom from "react-medium-image-zoom";
import { PlanningHero } from "components/PlanningHero";
import fiscalYear from "images/visier/ui-fiscal-year-timeline-plan.svg";
import validatorWorkflow from "images/visier/validator-workflow.png";
import validatorUI from "images/visier/validatorUI.png";
import warnings from "images/visier/warnings.jpg";
import stateflow from "images/visier/stateflow.jpg";
import issues from "images/visier/issues.png";
import config from "images/visier/config.png";
import planitem from "images/visier/planitem.jpg";
import dialogs from "images/visier/dialogs.jpg";
import rollup from "images/visier/rollup.jpg";
import help from "images/visier/help.png";
import disthelp from "images/visier/disthelp.png";
import validatorFeedback from "images/visier/validatorfeedback.png";
import dovetail from "images/visier/dovetail.png";

const Planning = () => {
	return (
		<div id="planning" className="project-content">
			<section className="hero">
				<h1>Planning Models</h1>
				<p>
					Turning Visier&apos;s people planning app into a top-tier ERP
					platform.
				</p>
			</section>
			<PlanningHero />
			<section>
				<h2>Overview</h2>
				<p>
					The goal of this project was to improve the UX of working with
					Planning models in Visier. Over a few months, a small team of
					developers and I shipped:
				</p>
				<ul>
					<li>a validation workflow for Planning models</li>
					<li>a wizard for creating components of a model</li>
					<li>
						cleaning up and consolidating settings, inferring automatically
						where possible
					</li>
					<li>in-app explanation for every configuration setting</li>
					<li>system-wide error prevention</li>
					<li>terminology improvements</li>
					<li>smart defaults</li>
				</ul>
			</section>
			<section>
				<h2>Introduction</h2>
				<p>
					Visier People: Planning started as a way for businesses to plan their
					headcount & costs. Over time, customers had new ideas for how they
					wanted to use Planning, and we had new ideas for business problems we
					could solve with Planning.
				</p>
				<p>
					To do this, we needed to <mark>turn Planning into a platform</mark>,
					and allow people to create custom models for Planning that could be
					configured to plan anything; from workspaces to FTE. My role was to
					deliver impactful UX improvements with minimal resources to enable the
					creation of new Planning models.
				</p>
			</section>
			<section>
				<h2>Getting started</h2>
				<p>
					Before jumping into design, I first made sure everybody was on the
					same page about what we were trying to accomplish and why. I spoke
					with product management, development, and my manager to understand how
					this project contributed to Visier&apos;s business goals, which would
					inform how we should approach the work.
				</p>
			</section>
			<Zoom>
				<Image
					src={planningDeck}
					alt="Presentation slides showing my approach to the project"
				/>
			</Zoom>
			<section>
				<p>
					This was a new business area, so we didn&apos;t want to go all-in
					right away. The ideal result would be the ability for our internal
					Solution Developers to quickly and easily create (and sell) new
					Planning models. The UX didn&apos;t need to be perfect, just good
					enough.
				</p>
				<h2>Research</h2>
				<p>
					Part of the work was identifying which problems to address. Only a few
					people had created or edited models before, so I spent time
					interviewing them and learning about their workflow to find areas for
					improvement.
				</p>
				<Image
					src={dovetail}
					alt="Screenshot of feedback in Dovetail"
					placeholder="blur"
				/>
				<p>Common themes included:</p>
				<ul>
					<li>lack of guidance</li>
					<li>no visibility into errors or problems</li>
					<li>arcane configuration settings</li>
					<li>no documentation or in-app help</li>
				</ul>
				<p>
					Through this research phase, I documented a set of issues that we then
					prioritized based on severity and estimated design & development cost.
				</p>
				<Zoom>
					<Image
						src={issues}
						alt="A list of issues that I identified during research & interviews"
						placeholder="blur"
					/>
				</Zoom>
				<p>
					We kept our minds open to completely recreating the UX from scratch,
					but ended up building on top of the existing experience for resourcing
					reasons.
				</p>

				<h2>Model validator</h2>
				<Image
					src={validatorFeedback}
					alt="Feedback from a colleague on the validator which reads: as a plan modeler I really appreciate the validation features and the warnings as I am customizing my first planning model for a customer - thank you!  It is easy to forget when adjusting all of the plan items so this really makes life easier!"
					placeholder="blur"
				/>
				<p>
					The first improvement we made was the model validator. Building a
					model is all about tweaking and testing, and it used to be a real
					pain.
				</p>
				<p>
					Before the validator, working with models felt like punch-card
					programming; it took forever, and there was no guarantee that your
					model would even work.
				</p>
				<Zoom>
					<Image
						src={validatorWorkflow}
						placeholder="blur"
						alt="Diagram of the old vs. new model validation workflow"
					/>
				</Zoom>
				<p>
					To create the validator, I worked with developers to determine the
					conditions that would cause a model to fail. The validator would check
					these conditions, and report whenever something went wrong with a
					clear description of the problem and a link to where to fix it.
				</p>

				<Zoom>
					<Image
						src={validatorUI}
						alt="Screenshot of the validator in action"
						placeholder="blur"
					/>
				</Zoom>
				<p>
					We surfaced warnings on the overall model view, as well as within the
					sub-view of any problematic model components (e.g. an input or a plan
					item).
				</p>
				<Image
					src={warnings}
					alt="Screenshot of the validator in action"
					placeholder="blur"
				/>
				<p></p>
				<Image
					src={stateflow}
					alt="Screenshot of the validator in action"
					placeholder="blur"
				/>
				<p>
					We created this state flow to determine when a model should be
					considered valid, unvalidated, or invalid.
				</p>
			</section>
			<section>
				<h2>Guided creation</h2>
				<p>
					To create a model, you need to create inputs (the data the model will
					use) and plan items (the data that will be planned). The app supported
					this, but didn&apos;t support the user very well. When an object was
					created, it simply popped into the list of existing objects (sometimes
					users wouldn&apos;t even notice something happened).
				</p>
				<p>
					In addition to this, opening the object would throw you right into the
					deep end of configuration.
				</p>
				<Zoom>
					<Image
						src={planitem}
						alt="What a plan item looks like"
						placeholder="blur"
					/>
				</Zoom>
				<p>
					To make creating objects a bit easier, we introduced guided creation
					workflows that would only ask for the bare minimum required to set up
					a functional object. This helped creators work faster, going into
					configuration only when they needed to.
				</p>
			</section>
			<Image src={dialogs} alt="dialogs" placeholder="blur" />
			<section>
				<h2>Reworking configuration</h2>
				<p>
					Another difficulty in creating Planning models was understanding just
					what each setting did. Not only was there no documentation, but the
					setting names themselves were a bit unclear.
				</p>
				<p>
					I audited every setting and option that could exist within a plan
					model, and worked to eliminate ones that could be derived from
					somewhere else or could be determined programmatically.
				</p>
			</section>
			<Zoom>
				<Image
					src={config}
					alt="Configuration options of Planning models"
					placeholder="blur"
				/>
			</Zoom>
			<section>
				<p>
					A good example of this is the <strong>rollup & distribution</strong>{" "}
					setting; these were distinct settings, but only certain combinations
					of options were valid. We combined these into a unified setting so
					users could only pick options that would work.
				</p>
				<Image src={rollup} alt="rollup" placeholder="blur" />
			</section>
			<section>
				<h2>Help</h2>
				<p>
					Another part of the UX that was lacking was help. After pruning the
					configuration, I wrote descriptive help text for each setting. More
					complex settings got long-form explanations with examples.
				</p>
				<Image src={help} alt="help" placeholder="blur" />
				<Image src={disthelp} alt="help" placeholder="blur" />
			</section>
			<section>
				<h2>Conclusion</h2>
				<p>
					This was a fun project where I got to work on the whole spectrum of UX
					issues. There&apos;s still a lot more work to do, but working closely
					with users and seeing immediate feedback has been very rewarding.
				</p>
			</section>
		</div>
	);
};

export default Planning;
