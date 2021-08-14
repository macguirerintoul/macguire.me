import React from "react"
import MagicLink from "./magiclink"

class Header extends React.Component {
	constructor(props) {    
		super(props);     
		this.state = { showMobileMenu: false, hasHomeBar: false, scheme: ""};
		this.toggleTheme = this.toggleTheme.bind(this);
	}

	toggleTheme() {
		this.setState({scheme: window.__theme === "dark" ? "light" : "dark"}, () => window.__setPreferredTheme(this.state.scheme)) 
	}

	toggleMobileMenu= ()=> {
		this.setState({showMobileMenu: !this.showMobileMenu});
	}

	closeMobileMenu = ()=> {
		this.setState({showMobileMenu: false});
	}

	componentDidMount() {
		let isiPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
		let aspect = window.screen.width / window.screen.height;
		if (isiPhone && aspect.toFixed(3) === "0.462") {
			this.setState({hasHomeBar: true});
		}
		this.setState({scheme: window.__theme});
	}

	render() {
	return (
		<header>
			<nav className={`navbar container ${ this.showMobileMenu ? "is-active" : ""} ${ this.hasHomeBar ? 'util-has-home-bar': ''} `}  >
				<div className="navbar-brand">
					<MagicLink className="navbar-item navbar__title" url="/">
						<span onClick={this.closeMobileMenu}>Macguire Rintoul</span>
					</MagicLink>

					<button className="mobile-menu button--secondary" onClick={this.toggleMobileMenu}>
						Menu
					</button>
				</div>

			<div className="navbar-menu" onClick={this.closeMobileMenu}>
				<div className="navbar-end">
					<span className="navbar-item" onClick={this.toggleTheme}>{ this.scheme === "dark" ? "☀️" : "🌒" }</span>
					<MagicLink url="/" className="navbar-item hvr-underline-reveal">
						Work
					</MagicLink> 
					<MagicLink url="/about" className="navbar-item hvr-underline-reveal">
						About
					</MagicLink>
					<MagicLink className="navbar-item contact-button button--primary" url="/contact" >Contact</MagicLink>
				</div>
			</div>
		</nav>
	</header>
	)
	}
} 

export default Header
 