import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
	render() {
		return (
			<div className='menu'>
				<ul>
					<li><Link to='/works'>Works</Link></li>
					<li><Link to='/moving-image'>Moving Image</Link></li>
					<li><Link to='/images'>Images</Link></li>
					<li><Link to='/cv'>CV</Link></li>
					<li><Link to='/statement'>Statement</Link></li>
					<li><Link to='/bio'>Bio</Link></li>
					<li><Link to='/contact'>Contact</Link></li>
				</ul>
				<ul>
					<li>ENG</li>
				</ul>
			</div>
		)
	}
}

export default Menu;