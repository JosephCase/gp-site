import React from 'react';


import Header from './Header.js';
import Footer from './Footer.js';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';


const MainContent = ({error, type, pages, content, pageChanging, path}) => {

	const classes = ['App', 'fix'];
	classes.push(pageChanging ? 'isNavigating' : '');

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
					<source src='http://www.giusypirrotta.com/content/file_283.webm' type='video/webm' />
					<source src='http://www.giusypirrotta.com/content/file_283.mp4' type='video/mp4' />
				</video>
				<h1>Giusy Pirrotta</h1>
			</div>
	        <Header />
	        <div className='contentContainer'>
				{ activeContent }
	        </div>
	        <Footer />
     	</div>
	)
}

export default MainContent;
