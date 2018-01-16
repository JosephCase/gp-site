import React, { PureComponent } from 'react';

class InlineVideo extends PureComponent {

	constructor(props) {
		super(props);
		this.playHandler = this.playHandler.bind(this);
		this.state = { showVideo: false };		
	}

	playHandler() {
		this.setState({showVideo: true});
	}

	render() {
		let { children, fallbackImage, ...otherProps } = this.props;
		let className = this.state.showVideo ? 'show' : 'hide';
		return(
			<video 
				className={className} 
				autoPlay='true' 
				loop='true'
				muted='true'
				playsInline='true'
				webkit-playsinline='true'
				onPlay={this.playHandler}
			>
				{children}
			</video>
		)
	}
}

export default InlineVideo;