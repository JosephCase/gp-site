import { combineReducers } from 'redux'
import { 
	RECIEVE_ENTIRE_STATE,
	CHANGE_LANGUAGE,
	CHANGE_PAGE,
	TOGGLE_SHOWHIDE_MENU,
	CHANGE_PAGE_START,
	PAGE_NOT_FOUND,
	FIX_HEADER
} from '../actions/actions.js';


function activePage(state = {}, action) {
	switch(action.type) {
		case RECIEVE_ENTIRE_STATE:
			return action.state.activePage
		case CHANGE_PAGE_START:
			return Object.assign({}, state, {
				pageChanging: true,
				next_path: action.path
			})
		case CHANGE_PAGE:
			return Object.assign({}, state, {
				pageChanging: false,
				path: action.path,
				error: null, next_path: null
			})
		case PAGE_NOT_FOUND:
			return Object.assign({}, state, {
				pageChanging: false,
				path: null,
				error: {errorCode: 404, message: 'Page not found'}
			})
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

function showMenu(state = true, action) {
	switch(action.type) {
		case TOGGLE_SHOWHIDE_MENU:
			return !state
		default:
			return state
	}	
}

function headerFixed(state = false, action) {
	switch(action.type) {
		case FIX_HEADER:
			return action.fix
		default:
			return state
	}
}

export default combineReducers({
	navigation, activePage, pages, language, showMenu, headerFixed
})