import React from 'react';
import { Link } from 'react-router-dom';

import InlineVideo from './InlineVideo';

var selectedImage = null;

const LandingPage = () => {

	if(!selectedImage) selectedImage = selectRandom();

	return(
		<div className='landingPage'>
			<InlineVideo className='bgVid' fallbackImage={selectedImage}>
				<source src='/public/showreel.webm' type='video/webm' />
				<source src='/public/showreel.mp4' type='video/mp4' />			
			</InlineVideo>
			<h1><Link to='/'>Giusy Pirrotta</Link></h1>
		</div>
	)
}

function selectRandom() {
	let images = [
		'/public/vidFallback_1.jpg',
		'/public/vidFallback_2.jpg',
		'/public/vidFallback_3.jpg',
		'/public/vidFallback_4.jpg',
		'/public/vidFallback_5.jpg',
		'/public/vidFallback_6.jpg',
		'/public/vidFallback_7.jpg',
		'/public/vidFallback_8.jpg',
		'/public/vidFallback_9.jpg',
		'/public/vidFallback_10.jpg',
		'/public/vidFallback_11.jpg',
		'/public/vidFallback_12.jpg',
		'/public/vidFallback_13.jpg',
		'/public/vidFallback_14.jpg',
		'/public/vidFallback_15.jpg'
	]

	let i = Math.floor(Math.random() * images.length);

	return images[i];

}

export default LandingPage;