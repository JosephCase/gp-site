import { combineReducers } from 'redux'
import { REQUEST_CONTENT, RECIEVE_CONTENT, RECIEVE_CONTENT_ERROR } from '../actions/actions.js';


function activePage(state = {}, action) {
	switch(action.type) {
		case REQUEST_CONTENT:
			return Object.assign({}, state, {
				isFetching: true,
				path: action.pagePath,
				error: null
			});
		case RECIEVE_CONTENT:
			return Object.assign({}, state, {
				isFetching: false
			})
		case RECIEVE_CONTENT_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: {code: action.statusCode, message: action.message}
			})
		default:
			return state
	}
}

function pages(state = {}, action) {
	switch(action.type) {
		case RECIEVE_CONTENT:
			return Object.assign({}, state, {					
				[action.pagePath]: action.page
			})
		default:
			return state
	}
}

export default combineReducers({
	activePage, pages
})