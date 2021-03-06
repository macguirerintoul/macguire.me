import MagicLink from './magiclink'
import Tag from './tag'
import { toDateString } from "../lib/utilities";
import React from 'react'; 

class TDTBlock extends React.Component {
	constructor(props) {    
		super(props);    
		this.state = {
			context: ""
		};  
	
	}

	render() { 
		return (
			<div className="tdt-block">
				<div className="tdt-block__title">
					<MagicLink  url={this.props.item.path}>
						<h2 className="link">{ this.props.item.title }</h2>
					</MagicLink>
				</div>
				<p className="tdt-block__description">{ this.props.item.description }</p>
			</div>
		)
	}
}

export default TDTBlock