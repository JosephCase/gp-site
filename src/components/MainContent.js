import React from 'react';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';

export const MainContent = ({ type, content }) => {

	switch(type) {
		case 'section':
			return <SectionContent content={content} />
		case 'page':
			return <PageContent content={content} />
		default:
			return null
	}

}
