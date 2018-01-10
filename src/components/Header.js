import React from 'react';
import { Link } from 'react-router-dom';
import VisibleMenu from '../containers/VisibleMenu.js';


const Header = () => (
	<header>
		<h1><Link to='/'>Giusy Pirrotta</Link></h1>
		<VisibleMenu />
	</header>
)

export default Header;