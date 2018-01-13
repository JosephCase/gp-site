import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import ImageSequencer from '../helpers/ImgSeq.js';


class ImgSeq extends PureComponent {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		setTimeout(() => {
			let bgSeq = new ImageSequencer(10, 373, '/public/seq/rgb_showreel_iphone_test[].jpg', 3, true, this.img);
				bgSeq.play(10, 373, "25fps", true);
		}, 500)
	}

	render() {
		return (
			<div className='landingPage'>
				<img ref={(img) => { this.img = img; }} className='bgSeq' src='/public/seq/rgb_showreel_iphone_test010.jpg' />
				<h1><Link to='/'>Giusy Pirrotta</Link></h1>				
			</div>
		)
	}
}

export default ImgSeq;
