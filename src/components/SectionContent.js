import React from 'react';
import { Link } from 'react-router-dom';

const SectionContent = ({ content }) => {

	let pages = content.map((page) => {
		let mainImage = '';
		if (page.mainImage_url) {
			mainImage = `http://localhost:8081/content/${page.mainImage_url.replace('.jpg', '_x500.jpg')}`;
		}
		return (
			<div key={page.id}>
				<p><Link to={page.path}>{page.name}</Link></p>
				<img src={mainImage} />
			</div>
		)
	});

	return (
		<div className='section'>
			<h1>Section</h1>
			<div>{ pages }</div>
		</div>
	);
}

export default SectionContent;