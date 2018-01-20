import React, { PureComponent } from 'react';

class InlineVideo extends PureComponent {

	constructor(props) {
		super(props);

		this.state = { showVideo: false };		
	}

	componentDidMount() {
		let video = this.video;
		setTimeout(() => {	//if the video hasn't played yet consider it failed
			if(video.currentTime > 0) {
				this.setState(Object.assign({}, this.state, {showVideo: true}));
			} else {
				video.src = null;
                        	this.props.onFail();
			}
		},1000)		
	}

	render() {
		let { children, fallbackImage } = this.props;
		let className = this.state.showVideo ? 'show' : 'hide';
		return(
			<video 
				ref={(video) => { this.video = video; }}
				className={className} 
				loop='true'
				muted='true'
				playsInline='true'
				webkit-playsinline='true'
				autoPlay='true'
			>
				{children}
			</video>
		)
	}
}

export default InlineVideo;
