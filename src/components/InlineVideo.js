import React, { PureComponent } from 'react';

class InlineVideo extends PureComponent {

	constructor(props) {
		super(props);
		this.showVideo = this.showVideo.bind(this);
		this.state = {showVideo: false };		
	}

	showVideo() {
		this.setState({showVideo: true});
	}

	render() {
		let { children, fallbackImage, ...otherProps } = this.props;
		let videoStyle = {
			opacity: this.state.showVideo ? '1' : '0'
		};
		// if(this.state.useVideo) {
		return(
			<video 
				style={videoStyle}
				{...otherProps} 
				autoPlay='true' 
				loop='true' 
				muted='true' 
				playsInline='true' 
				webkit-playsinline='true'
				onPlay={this.showVideo}
			>
				{ children }
			</video>
		)
		// } else {
			// return <div {...otherProps} style={divStyle}></div>
		// }
	}
}

export default InlineVideo;