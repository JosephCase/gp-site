import React from 'react';
import { Link } from 'react-router-dom';

import Image from './Image.js';
import Page from './Page.js';

class SectionContent extends Page {

	render() {

		var { pages } = this.props;

		let pageElements = pages.map((page) => {
			return (
				<Link to={page.path} key={page.id}>
					<Image src={page.mainImage_url} alt='' />
					<div className='overlay'>
						<p>{page.name}</p>
					</div>
				</Link>
			)
		});

		return (
			<div className='pages'>
				{ pageElements }
			</div>
		);

	}
}

export default SectionContent;