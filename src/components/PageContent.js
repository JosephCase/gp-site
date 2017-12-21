import React, { Component } from 'react';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';

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

const Text = ({content, size}) => {
	content = content.replace(/#(?!#)/g, '# ');
	// (?!.*bar)
	// content = content.replace('#', '# ');
	return(
		<div className={`text s${size}`}>
			<Markdown source={content} plugins={[breaks]} />
		</div>
	)
	// return(
	// 	<div className={`text s${size}`}>
	// 		<p>{content}</p>
	// 	</div>
	// )
}

const Video = (props) => (
	<video autoPlay='true' controls className={`s${props.size}`}>
		<source src={`http://localhost:8081/content/${props.content}.webm`} type='video/webm' />
		<source src={`http://localhost:8081/content/${props.content}.mp4`} type='video/mp4' />
	</video>
)


export default PageContent;