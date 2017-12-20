export const RECIEVE_ENTIRE_STATE = 'RECIEVE_ENTIRE_STATE';
export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECIEVE_CONTENT = 'RECIEVE_CONTENT';
export const RECIEVE_CONTENT_ERROR = 'RECIEVE_CONTENT_ERROR';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const TOGGLE_SHOWHIDE_MENU = 'TOGGLE_SHOWHIDE_MENU';

export function fetchState(path) {

	return (dispatch) => {
		
		return fetch(`/api${path}`)
		.then((res) => {
			if (!res.ok) throw res.statusText; 
			return res.json();
		})
		.then((body) => {
			dispatch(recieveState(body));
		})
		.catch(err => {
			console.log(err);
		})
	}

}

function recieveState(state) {
	return {
		type: RECIEVE_ENTIRE_STATE,
		state
	}
}

function requestContent(pagePath) {
	return {
		type: REQUEST_CONTENT
	}
}

function receivePageContent(pagePath, page) {
	return {
		type: RECIEVE_CONTENT,
		pagePath,
		page: page
	}
}

function receivePageContent_error(err) {
	return {
		type: RECIEVE_CONTENT_ERROR,
		error: err
	}
}

function changePage(path) {
	return {
		type: CHANGE_PAGE,
		path
	}
}

export function navigate(path) {

	return (dispatch, getState) => {

		dispatch(changePage(path));

		if(shouldFetchPage(getState(), path)) {
			return dispatch(fetchPage(path));
		} else {
			return Promise.resolve();
		}

	}

}

function shouldFetchPage(state, path) {
	let page = state.pages[path];
	if(page) {
		return false;
	} else {
		return true;
	}
}

function fetchPage(pagePath) {

	return (dispatch) => {

		dispatch(requestContent(pagePath));

		return fetch(`/api${pagePath}`)
		.then((res) => {
			if (!res.ok) {
				let err = {statusCode: res.status,message: res.statusText};
				throw err;
			}; 
			return res.json();
		})
		.then((body) => {
			dispatch(receivePageContent(pagePath, body));
		})
		.catch(err => {
			dispatch(receivePageContent_error(err))
		})
	}

}

export function changeLanguage(languageCode) {
	return {
		type: CHANGE_LANGUAGE,
		languageCode: languageCode
	}
}

export function showHideMenu() {
	return {
		type: TOGGLE_SHOWHIDE_MENU
	}
}