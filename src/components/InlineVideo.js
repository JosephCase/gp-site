import React, { PureComponent } from 'react';

class InlineVideo extends PureComponent {

	constructor(props) {
		super(props);
		this.handleError = this.handleError.bind(this);
		this.state = { useVideo: true };		
	}

	handleError() {
		this.setState({useVideo: false});
	}

	render() {
		let { children, fallbackImage, ...otherProps } = this.props;
		if(this.state.useVideo) {
			let childrenLength = children.length
			return(
				<video {...otherProps} autoPlay='true' loop='true' muted='true' playsInline='true' webkit-playsinline='true'>
					{ 
						children.map((child, i) => {
							if(i === childrenLength - 1) {
								return React.cloneElement(child, { key: i, onError: this.handleError });
							}
							return React.cloneElement(child, { key: i });;
						}) 
					}
				</video>
			)
		} else {
			let divStyle = {
				backgroundImage: `url(${fallbackImage})`,
			};
			return <div {...otherProps} style={divStyle}></div>
		}
	}
}

export default InlineVideo;