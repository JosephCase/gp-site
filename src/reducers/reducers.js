import { REQUEST_CONTENT, RECIEVE_CONTENT } from '../actions/actions.js'

export function contentByPage(state = {}, action) {
	switch(action.type) {
		case REQUEST_CONTENT:
			return Object.assign({}, state, {
				activePath: action.pagePath,
				[action.pagePath]: {
					isFetching: true,
					type: null,
					content: []
				}
			})
		case RECIEVE_CONTENT:
			return Object.assign({}, state, {
				[action.pagePath]: {
					isFetching: false,
					type: action.page.type,
					content: action.page.pages ? action.page.pages : action.page.content
				}
			})
		default:
			return state
	}
}