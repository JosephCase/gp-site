import React from 'react';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';

const MainContent = ({error, type, pages, content}) => {
	if(error) {
		return <PageNotFound />
	} else {
		switch(type) {
			case 'section':
				return <SectionContent pages={pages} />
			case 'page':
				return <PageContent content={content} />
			default:
				return null
		}
	}
}

export default MainContent;
