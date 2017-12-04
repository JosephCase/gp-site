import React from 'react';

const Section = (props) => (
	<div className='section'>
		<h1>{props.match.params.section} section</h1>
	</div>
)

export default Section;