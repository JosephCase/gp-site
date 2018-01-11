import React, { Component } from 'react';


import Header from './Header.js';
import Footer from './Footer.js';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';


class MainContent extends Component {

	constructor(props) {
		super(props);
		this.state = { isNavigating: true };
	}

	componentDidUpdate() {
		if(this.state.isNavigating !== this.props.pageChanging) {
			this.setState({isNavigating: this.props.pageChanging})
		}
	}

	render() {

		let {error, type, pages, content, path} = this.props;

		const classes = ['App'];
		classes.push(this.state.isNavigating ? 'isNavigating' : '');

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
}

export default MainContent;
