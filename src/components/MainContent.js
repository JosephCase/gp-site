import React from 'react';


import Header from '../containers/Header.js';
import Footer from './Footer.js';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';


const MainContent = (props) => {

	console.log(props);

	let {error, type, pages, content, pageChanging, path, headerFixed} = props;

	const classes = ['App'];
	classes.push(pageChanging ? 'isNavigating' : '');
	classes.push(headerFixed ? 'fix' : '');

	var activeContent;
	if(error) {
		activeContent = <PageNotFound />
	} else {
		switch(type) {
			case 'section':
				activeContent = <SectionContent pages={pages} />
				break;
			case 'page':
				activeContent = <PageContent content={content} />
				break;
			default:
				activeContent = null
		}
	}

	return (
		<div className={classes.join(' ')} data-path={path}>
			<div className='loader'></div>
			<div className='landingPage'>
				<video autoPlay='true' loop='true'>
					<source src='http://www.giusypirrotta.com/content/file_241.webm' type='video/webm' />
					<source src='http://www.giusypirrotta.com/content/file_241.mp4' type='video/mp4' />
				</video>
				<h1>Giusy Pirrotta</h1>
			</div>
	        <Header />
	        <div className='contentContainer'>
				{ activeContent }
	        </div>
	        <Footer />
			<div className='fader'></div>
     	</div>
	)
}

export default MainContent;
