import React, { Component } from 'react';

import Page from './Page.js';
import Image from './Image.js';


class PageContent extends Page {
	render() {		
		var { content } = this.props;
		let contentElements = content.map((element) => {
			switch(element.type) {
				case 'text':
					return <Text key={element.id} {...element} />
				case 'image':
					return <Image key={element.id} src={element.content} className={`s${element.size}`} />
				case 'video':
					return <Video key={element.id} {...element} />
				default:
					return null
			}
		});
		return (
			<div className='content'>
				{ contentElements }
			</div>
		);
	}
}

const Text = (props) => (
	<p className={`text s${props.size}`}>{props.content}</p>
)

const Video = (props) => (
	<video autoPlay='true' controls className={`s${props.size}`}>
		<source src={`http://localhost:8081/content/${props.content}.webm`} type='video/webm' />
		<source src={`http://localhost:8081/content/${props.content}.mp4`} type='video/mp4' />
	</video>
)


export default PageContent;