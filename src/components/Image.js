import React, { Component } from 'react';

class Image extends Component {
	
	render() {
		return (
			<img data-src={this.props.src} className={this.props.className} alt='' />
		)
	}

	
}


export default Image;