import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Section from '../components/section';
import Page from '../components/page';
import PageNotFound from '../components/pageNotFound';

const homepage = 'work';

const Main = () => (
	<Switch>
		<Route exact path='/' render={(props) => {
			props.match.params.section = homepage;
			return <Section {...props} />;
		}} />		
		<Route exact path='/:section' component={Section} />	
		<Route exact path='/:section/:page' component={Page} />
		<Route path='/' component={PageNotFound} />
	</Switch>
)

export default Main;

