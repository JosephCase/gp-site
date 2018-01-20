import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import InlineVideo from './InlineVideo';
import ImageCarousel from './ImageCarousel';

const images = [
	'/vidFallback_2.jpg',
	'/vidFallback_3.jpg',
	'/vidFallback_4.jpg',
	'/vidFallback_5.jpg',
	'/vidFallback_6.jpg',
	'/vidFallback_8.jpg',
	'/vidFallback_9.jpg',
	'/vidFallback_10.jpg',
	'/vidFallback_11.jpg',
	'/vidFallback_12.jpg',
	'/vidFallback_13.jpg',
	'/vidFallback_14.jpg',
	'/vidFallback_15.jpg'
]

class LandingPage extends PureComponent {

	constructor(props) {
		super(props);
		this.videoFailHandler = this.videoFailHandler.bind(this);
		this.state = { videoFailed: false };		
	}

	videoFailHandler() {
		this.setState(Object.assign({}, this.state, {videoFailed: true}));
	}

	render() {
		let background;
		if(this.state.videoFailed){
			background = <ImageCarousel images={images} delay='6' />;
		} else {
			background = (
				<InlineVideo onFail={this.videoFailHandler}>
					<source src='/showreel.webm' type='video/webm' />
					<source src='/showreel.mp4' type='video/mp4' />	
				</InlineVideo>
			)
		}
		return (
			<div className='landingPage'>
				{ background }
				<h1><Link to='/'>Giusy Pirrotta</Link></h1>
			</div>
		)
	}
}

export default LandingPage;
