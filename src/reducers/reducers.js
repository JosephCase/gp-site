import { combineReducers } from 'redux'
import { 
	REQUEST_CONTENT,
	RECIEVE_CONTENT,
	RECIEVE_CONTENT_ERROR,
	RECIEVE_ENTIRE_STATE,
	CHANGE_LANGUAGE,
	CHANGE_PAGE,
	TOGGLE_SHOWHIDE_MENU,
	CHANGE_PAGE_START
} from '../actions/actions.js';


function activePage(state = {}, action) {
	switch(action.type) {
		case CHANGE_PAGE_START:
			return Object.assign({}, state, {
				pageChanging: true
			})
		case CHANGE_PAGE:
			return Object.assign({}, state, {
				isFetching: false,
				pageChanging: false,
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
		case RECIEVE_ENTIRE_STATE:
			return action.state.activePage
		default:
			return state
	}
}

function pages(state = {}, action) {
	switch(action.type) {
		case RECIEVE_ENTIRE_STATE:
			return action.state.pages
		default:
			return state
	}
}

function navigation(state = [], action) {
	switch(action.type) {
		case RECIEVE_ENTIRE_STATE:
			return action.state.navigation
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

function showMenu(state = false, action) {
	switch(action.type) {
		case CHANGE_PAGE:
			return false
		case TOGGLE_SHOWHIDE_MENU:
			return !state
		default:
			return state
	}	
}

export default combineReducers({
	navigation, activePage, pages, language, showMenu
})