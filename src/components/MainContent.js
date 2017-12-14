import React, { Component } from 'react';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';

class MainContent extends Component {
	render() {
		if(this.props.error) {
			return <PageNotFound />
		} else {
			switch(this.props.type) {
				case 'section':
					return <SectionContent pages={this.props.pages} />
				case 'page':
					return <PageContent content={this.props.content} />
				default:
					return null
			}
		}
	}

}

export default MainContent;
