import React from 'react';
import { Link } from 'react-router-dom';

import InlineVideo from './InlineVideo';

const LandingPage = () => {

	return(
		<div className='landingPage'>
			<InlineVideo>
				<source src='/showreel.webm' type='video/webm' />
				<source src='/showreel.mp4' type='video/mp4' />			
			</InlineVideo>
			<h1><Link to='/'>Giusy Pirrotta</Link></h1>
		</div>
	)
}

export default LandingPage;
