import React, { Component } from 'react';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';

class MainContent extends Component {
	componentDidMount() {
		// if(!this.props.content) {
			// this.props.getContent();
		// }
	}
	render() {
		switch(this.props.type) {
			case 'section':
				return <SectionContent content={this.props.content} />
			case 'page':
				return <PageContent content={this.props.content} />
			default:
				return null
		}
	}

}

export default MainContent;
