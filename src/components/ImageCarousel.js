import React, { PureComponent } from 'react';

class ImageCarousel extends PureComponent {

	constructor(props) {
		super(props);

		this.startRotation = this.startRotation.bind(this);
		this.imageLoadHandler = this.imageLoadHandler.bind(this);

		this.state = { index: null, action: 0, 
			d1Hide: true,
			d1Image: null,
			d2Image: null
		};	
	}

	componentDidMount() {
		let { images } = this.props; 
		let i = Math.floor(Math.random() * images.length);
		this.setState(Object.assign({}, this.state, {index: i}));
		let preloadImage = new Image();
		preloadImage.addEventListener("load", this.imageLoadHandler);
		preloadImage.src = this.props.images[i];
	}

	imageLoadHandler() {
		console.log('image loaded');
		let i = this.state.index;
		this.setState(Object.assign({}, this.state, {d1Image: this.props.images[i], d1Hide: false}));
		this.startRotation();
	}

	startRotation() {
		setInterval(() => {
			let a = (this.state.action == 4) ? 1 : this.state.action + 1;
			let i;
			switch(a) {
				case 1:
					i = (this.state.index == (this.props.images.length - 1) ? 0 : this.state.index + 1);
					this.setState(Object.assign({}, this.state, {index: i, action: a, d2Image: this.props.images[i]}));
					break;
				case 2:
					this.setState(Object.assign({}, this.state, {action: a, d1Hide: true}));
					break;
				case 3:
					i = (this.state.index == (this.props.images.length - 1) ? 0 : this.state.index + 1);
					this.setState(Object.assign({}, this.state, {index: i, action: a, d1Image: this.props.images[i]}));
					break;
				case 4:
					this.setState(Object.assign({}, this.state, {action: 0, d1Hide: false}));
					break;
			}
		}, this.props.delay * 500)		
	}

	render() {
		if(this.state.index === null) return null;
		let style = {
			height: window.innerHeight
		};
		let style1 = {
			backgroundImage: `url(${this.state.d1Image})`,
			opacity: this.state.d1Hide ? 0 : 1
		}
		let style2 = {
			backgroundImage: `url(${this.state.d2Image})`
		}
		return (
			<div className='imageCarousel' style={style}>
				<div style={style2}></div>
				<div style={style1}></div>
			</div>
		)
	}
}

export default ImageCarousel;