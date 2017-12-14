import { combineReducers } from 'redux'
import { 
	REQUEST_CONTENT,
	RECIEVE_CONTENT,
	RECIEVE_CONTENT_ERROR,
	RECIEVE_NAVIGATION,
	CHANGE_LANGUAGE,
	CHANGE_PAGE
} from '../actions/actions.js';


function activePage(state = {}, action) {
	switch(action.type) {
		case CHANGE_PAGE:
			return Object.assign({}, state, {
				isFetching: false,
				path: action.path,
				error: null
			})
		case REQUEST_CONTENT:
			return Object.assign({}, state, {
				isFetching: true
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

function navigation(state = [], action) {
	switch(action.type) {
		case RECIEVE_NAVIGATION: {
			return [
				...state,
				...action.navigation
			]
		}
		default:
			return state
	}
}

function language(state = 'eng', action) {
	switch(action.type) {
		case CHANGE_LANGUAGE:
			return action.languageCode
		default:
			return state
	}
}

export default combineReducers({
	navigation, activePage, pages, language
})