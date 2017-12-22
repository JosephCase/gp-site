import React, { Component } from 'react';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';

import config from '../config.js';
import Page from './Page.js';
import Image from './Image.js';

const contentHost = config.contentHost;

class PageContent extends Page {
	render() {		
		var { content } = this.props;
		let contentElements = content.map((element) => {
			switch(element.type) {
				case 'text':
					return <Text key={element.id} {...element} />
				case 'image':
				case 'img':
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

const Text = ({content, size}) => {
	content = content.replace(/#(?!#)/g, '# ');
	// (?!.*bar)
	// content = content.replace('#', '# ');
	return(
		<div className={`text s${size}`}>
			<Markdown source={content} plugins={[breaks]} />
		</div>
	)
}

const Video = (props) => (
	<video autoPlay='true' controls className={`s${props.size}`}>
		<source src={`${contentHost}${props.content}.webm`} type='video/webm' />
		<source src={`${contentHost}${props.content}.mp4`} type='video/mp4' />
	</video>
)


export default PageContent;