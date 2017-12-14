import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import VisibleMenu from '../containers/VisibleMenu.js';

const Header = () => (
	<div className='header'>
		<h1><Link to='/'>Giusy Pirrotta</Link></h1>
		<VisibleMenu />
	</div>
)

export default Header;