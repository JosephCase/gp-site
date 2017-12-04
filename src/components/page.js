import React from 'react';

const Page = (props) => (
	<div className='page'>
		<h1>{props.match.params.page} page</h1>
	</div>
)

export default Page;