import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/menu';

class Header extends Component {
	render() {
		return (
			<div className='header'>
				<h1><Link to=''>Giusy Pirrotta</Link></h1>
				<Menu />
			</div>
		)
	}
}

export default Header;