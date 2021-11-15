import Layout from "../components/layout";
import MagicLink from "../components/magiclink";
import Head from "next/head";
import React from "react";

class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			submissionState: "default",
			email: "",
			message: "",
		};
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (event) => {
		fetch("/api/contact", {
			method: "POST",
			body: JSON.stringify({
				email: this.state.email,
				message: this.state.message,
			}),
		})
			.then((response) => {
				console.log(response);
				if (response.status == 200) {
					this.setState({ submissionState: "submitted" });
				} else {
					this.setState({ submissionState: "error" });
				}
			})
			.catch((error) => {
				console.error(error);
				this.setState({ submissionState: "error" });
			});
		event.preventDefault();
	};

	render() {
		let feedback;
		if (this.state.submissionState === "submitted") {
			feedback = (
				<div className="feedback">
					<h2>Thanks! Message sent.</h2>
					<p>I'll get back to you shortly.</p>
					<p>
						<MagicLink url="/">Back home</MagicLink>
					</p>
				</div>
			);
		} else if (this.state.submissionState === "error") {
			feedback = (
				<div className="feedback">
					<h2>Error</h2>
					<p>
						My apologies. firstname.lastname@gmail.com also works. Here is your
						message:
					</p>
					<p>{this.state.message}</p>
					<p>
						<MagicLink url="/">Back home</MagicLink>
					</p>
				</div>
			);
		}

		return (
			<Layout>
				<Head>
					<title>Contact ✦ Macguire Rintoul</title>
				</Head>
				<h1>Contact</h1>
				<hr />

				<form
					className="contact-form"
					method="POST"
					name="Contact"
					action="/api/contact"
					onSubmit={this.handleSubmit}
				>
					{this.state.submissionState === "default" && (
						<div>
							<label htmlFor="email">Your email</label>
							<input
								value={this.state.email}
								onChange={this.handleInputChange}
								type="email"
								name="email"
								required
							/>

							<label htmlFor="message">Message</label>
							<textarea
								value={this.state.message}
								onChange={this.handleInputChange}
								name="message"
								required
							/>

							<button type="submit">Send</button>
						</div>
					)}
				</form>
				{feedback}
			</Layout>
		);
	}
}

export default Contact;
