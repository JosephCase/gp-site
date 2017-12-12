import React from 'react';

const PageContent = ({ content }) => {

	let contents = content.map((element) => {
		switch(element.type) {
			case 'text':
				return <Text key={element.id} {...element} />
			case 'image':
				return <Image key={element.id} {...element} />
			case 'video':
				return <Video key={element.id} {...element} />
			default:
				return null
		}
	});
	return (
		<div className='page'>
			<h1>Page</h1>
			<div>{ contents }</div>
		</div>
	);
}

const Text = (props) => (
	<p className={`text ${props.language} s${props.size}`}>{props.content}</p>
)

const Image = (props) => {
	let imgPath = `http://localhost:8081/content/${props.content.replace('.jpg', '_x500.jpg')}`;
	if(imgPath) {
		return <img src={imgPath} />
	} else {
		return <img src='' />
	}
}

const Video = (props) => (
	<video autoPlay='true' controls className={`${props.language} s${props.size}`}>
		<source src={`http://localhost:8081/content/${props.content}.webm`} type='video/webm' />
		<source src={`http://localhost:8081/content/${props.content}.mp4`} type='video/mp4' />
	</video>
)


export default PageContent;