import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header.js';
import Footer from './Footer.js';
import PageContent from './PageContent.js';
import SectionContent from './SectionContent.js';
import PageNotFound from './PageNotFound.js';


class MainContent extends PureComponent {

	constructor(props) {
		super(props);
		this.state = { isNavigating: false };
	}

	componentDidUpdate() {
		// if(this.state.isNavigating !== this.props.pageChanging) {
			setTimeout(() => {
				this.setState({isNavigating: this.props.pageChanging})
			}, 0)
		// }
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
					<video autoPlay='true' loop='true' muted='true'>
						<source src='/public/showreel.webm' type='video/webm' />
						<source src='/public/showreel.mp4' type='video/mp4' />
					</video>
					<h1><Link to='/'>Giusy Pirrotta</Link></h1>
				</div>
		        <Header />
		        <div className='contentContainer'>
					{ activeContent }
		        </div>
		        <Footer />
	     	</div>
		)
	}
}

export default MainContent;
