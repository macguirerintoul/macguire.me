import React from "react";
import MagicLink from "./magiclink";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showMobileMenu: false, hasHomeBar: false, scheme: "" };
		this.toggleTheme = this.toggleTheme.bind(this);
	}

	toggleTheme() {
		this.setState(
			{ scheme: window.__theme === "dark" ? "light" : "dark" },
			() => window.__setPreferredTheme(this.state.scheme)
		);
	}

	toggleMobileMenu = () => {
		this.setState({ showMobileMenu: !this.state.showMobileMenu });
	};

	closeMobileMenu = () => {
		this.setState({ showMobileMenu: false });
	};

	componentDidMount = () => {
		let isiPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
		let aspect = window.screen.width / window.screen.height;
		if (isiPhone && aspect.toFixed(3) === "0.462") {
			this.setState({ hasHomeBar: true });
		}
		this.setState({ scheme: window.__theme });
	};

	render() {
		return (
			<header>
				<nav
					className={`navbar container ${
						this.state.showMobileMenu ? "is-active" : ""
					} ${this.state.hasHomeBar ? "util-has-home-bar" : ""} `}
				>
					<div className="navbar-always">
						<MagicLink url="/">
							<span
								className="navbar-item navbar__title"
								onClick={this.closeMobileMenu}
							>
								Macguire Rintoul
							</span>
						</MagicLink>

						<button className="mobile-menu" onClick={this.toggleMobileMenu}>
							{this.state.showMobileMenu ? "Close" : "Menu"}
						</button>
					</div>

					<div className="navbar-sometimes">
						<span className="navbar-item__theme" onClick={this.toggleTheme}>
							{this.state.scheme === "dark" ? "☼" : "☽"}
						</span>
						<MagicLink url="/">
							<span className="navbar-item__work hvr-underline-reveal">
								Home
							</span>
						</MagicLink>
						<MagicLink url="/about">
							<span className="navbar-item__about hvr-underline-reveal">
								About
							</span>
						</MagicLink>
						<MagicLink url="/contact">
							<span className="navbar-item__contact contact-button">
								Contact
							</span>
						</MagicLink>
					</div>
				</nav>
			</header>
		);
	}
}

export default Header;
