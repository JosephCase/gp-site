import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../routes';

import PageNotFound from '../components/pageNotFound';


import { store } from '../index.js';
import { fetchPage } from '../actions/actions.js';

const Router = () => (
	<Switch>
		<Route exact path='/' render={(props) => {
			store.dispatch(fetchPage('/works')).then(() => console.log(store.getState()));
			return null;		
		}} />
		<Route path='*' render={(props) => {
			store.dispatch(fetchPage(props.match.url)).then(() => console.log(store.getState()));
			return null;
		}} />
	</Switch>
)

export default Router;
		

// const bum = () => (

// 	<Switch>
// 		<Route exact path='/' render={(props) => {
// 			return <Section apiPath='/sections/1' />;
// 		}} />	
// 		<Route exact path='/:section' render={(props) => {
// 			return <Section />
// 		<Route exact path='/:section' component={Section} />
// 			let routeObject = routes.find((element) => {
// 				return element.path === props.match.url;
// 			})
// 			if (routeObject === undefined) return <PageNotFound />;
// 		<Route path='*' component={PageNotFound} />
// 			if(routeObject.type === 'section') {
// 				return <Section apiPath={routeObject.apiPath} />
// 			} else {
// 				props.match.params.page = props.match.params.section;
// 				return <Page {...props} />
// 			}
// 		}
// 		} />
// 	</Switch>	
// )
