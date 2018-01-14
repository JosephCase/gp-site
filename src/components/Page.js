import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import config from '../config.js';

const contentHost = config.contentHost;
const imageSizes = config.imageSizes;

class Page extends PureComponent {	
	constructor(props) {
		super(props);

		this.showImages = this.showImages.bind(this);
		this.showImage = this.showImage.bind(this);
	}

	componentDidMount() {
		this.showImages();
	}
	componentDidUpdate() {
		this.showImages();
	}

	showImages() {
		let rootElem = ReactDOM.findDOMNode(this);
		this.images = document.querySelectorAll("img.lazy:not(.loaded)");
		if(this.images.length != 0) {
			this.showImage(0); // show the first image
		}
	}

	//Loop through images in order
	showImage(i) {

		let reactClass = this;
		
		this.images[i].src = this.chooseSize(this.images[i].getAttribute('data-src'), this.images[i].clientWidth);
		
		this.images[i].addEventListener("load", function() {
			this.className = this.className + ' loaded';
			if (i < reactClass.images.length - 1) {
				reactClass.showImage(i+1);
			}
		}, false);
		this.images[i].addEventListener('error', function() {
			this.src = '/placeholder.gif';
		})
	}

	chooseSize(src, width) {

		if(!src) return '/public/placeholder.gif';

		var physicalWidth = this.calculatePhysicalWidth(width);

		for (var i = imageSizes.length - 1; i >= 0; i--) {
			if (physicalWidth <= imageSizes[i]) {
				return `${contentHost}/${src.replace(".jpg", "_x" + imageSizes[i] + ".jpg")}`;
				break;
			}
		}
		//if the image is larger than the assets, rturn the largest
		return `${contentHost}/${src.replace(".jpg", "_x" + imageSizes[0] + ".jpg")}`
	}
	calculatePhysicalWidth (width) {
		var multiplier = (window.devicePixelRatio >= 2) ? 2 : 1;
		return width * multiplier;
	}
}

export default Page;
