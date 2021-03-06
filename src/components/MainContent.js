import React, { PureComponent } from 'react';

import Header from './Header.js';
import Footer from './Footer.js';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';
import LandingPage from './LandingPage.js';
import GoogleAnalytics from './GoogleAnalytics.js';

class MainContent extends PureComponent {

	constructor(props) {
		super(props);
		this.state = { isNavigating: false };
	}

	componentDidUpdate() {
		setTimeout(() => {
			this.setState({ isNavigating: this.props.pageChanging })
		}, 0)
	}

	render() {

		const { error, type, pages, content, path } = this.props;

		const classes = ['App'];
		classes.push(this.state.isNavigating ? 'isNavigating' : '');

		var activeContent;
		if (error) {
			activeContent = <PageNotFound />
		} else {
			switch (type) {
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
				<GoogleAnalytics path={path} />
				<div className='loader'></div>
				<LandingPage />
				<Header />
				<div className='contentContainer'>
					{activeContent}
				</div>
				<Footer />
			</div>
		)
	}
}

export default MainContent;
