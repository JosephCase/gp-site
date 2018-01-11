import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VisibleMenu from '../containers/VisibleMenu.js';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { sticky: false };
		this.scollListener = this.scollListener.bind(this);
	}

	componentDidMount() {
		window.addEventListener('scroll', this.scollListener);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scollListener);
	}

	scollListener() {

		let top = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
		if(top >= (window.innerHeight - 50) && !this.state.sticky) {
			this.setState({sticky: true});
		} else if(top < (window.innerHeight - 50) && this.state.sticky) {
			this.setState({sticky: false});
		}

	}

	render() {
		var classes = [];
		classes.push(this.state.sticky ? 'fix' : '');
		return(
			<header className={classes.join(' ')}>
				<h1><Link to='/'>Giusy Pirrotta</Link></h1>
				<VisibleMenu />
			</header>
		)
	}
}


export default Header;