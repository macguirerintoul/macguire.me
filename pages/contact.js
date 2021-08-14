import Layout from '../components/layout'
import Head from 'next/head'
import React from 'react'

class Contact extends React.Component {
	constructor(props) {    
		super(props);    
		this.encode = this.encode.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			submissionState: "default",
			formData: { 
				name: "", email: "", message: "", "form-name": "Contact" 
			}
		}
	}

	encode = (data) => {
		return Object.keys(data) .map( key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) ) .join("&");
	}

	handleSubmit = (event) => {
		// Post the form data to '/' where Netlify Forms will pick it up
		console.log(
			"event.target.getAttribute('name')",
			event.target.getAttribute("name")
		);
		console.log(
			"encoded form data: ",
			this.encode({
				"form-name": event.target.getAttribute("name"),
				...this.formData
			})
		);
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: this.encode({
				"form-name": event.target.getAttribute("name"),
				...this.formData
			})
		})
			.then(data => {
				console.log(data);
				if (data.status == 200) {
					this.submissionState = "submitted";
				} else if (data.status == 401) {
					this.submissionState = "401";
				}
			})
			.catch(error => {
				console.error(error);
				this.submitted = "error";
				alert(error);
			});
	}

	render() {
		let feedback;
		if (this.submissionState === 'submitted') {
			feedback = (
				<div>
					<h2>Message sent.</h2>
					<p>Thanks for reaching out. I will be in touch with you shortly.</p>
					<p><g-link to="/blog">How about a blog post?</g-link></p>
				</div>
			)
		} else if (this.submissionState === 'error') {
			feedback = (
				<div
					className="info-block info-block--error"
				>
					<p class="info-block__title">
						An error occurred 😳
					</p>
				</div>
			)
		}

		return (
			<Layout>
				<Head>
					<title>Contact ✦ Macguire Rintoul</title>
				</Head>
				<h1>Contact</h1>
				<hr />

				{/* netlify attribute connects the form to Netlify Forms */}
				<form
					v-if="submissionState === 'default'"
					className="contact-form"
					method="POST"
					name="Contact"
					action="/"
					netlify="true"
					onSubmit={this.handleSubmit}
				>
					<input type="hidden" form-name="Contact" />

					<label htmlFor="name">Name</label>
					<input v-model="formData.name" type="text" name="name" />

					<label htmlFor="email">Email</label>
					<input v-model="formData.email" type="email" name="email" required />

					<label htmlFor="message">Message</label>
					<textarea v-model="formData.message" name="message" required />

					<div className="form__button-container">
						<button type="submit" className="button--primary">
							Send
						</button>
					</div>
				</form>
				{feedback}
			</Layout>
		)
	}
}  

export default Contact