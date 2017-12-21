import React from 'react';


import Header from './Header.js';
import Footer from './Footer.js';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';


const MainContent = ({error, type, pages, content, pageChanging}) => {

	const classes = ['App'];
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
		<div className={classes.join(' ')}>
        <Header />
        <div className='contentContainer'>
			{ activeContent }
        </div>
        }
        <Footer />
      </div>
	)
}

export default MainContent;
