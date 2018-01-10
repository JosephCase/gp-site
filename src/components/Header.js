import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VisibleMenu from '../containers/VisibleMenu.js';

class Header extends Component {
	constructor(props) {
		super(props);
		this.scollListener = this.scollListener.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.scollListener);
	}

	scollListener() {

		var { fixHeader } = this.props;

		let top = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
		if(top >= (window.innerHeight - 50)) {
			fixHeader(true);
		} else {
			fixHeader(false);
		}
	}

	render() {
		return(
			<header>
				<h1><Link to='/'>Giusy Pirrotta</Link></h1>
				<VisibleMenu />
			</header>
		)
	}
}


export default Header;