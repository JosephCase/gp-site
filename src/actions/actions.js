export const RECIEVE_NAVIGATION = 'RECIEVE_NAVIGATION';
export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECIEVE_CONTENT = 'RECIEVE_CONTENT';
export const RECIEVE_CONTENT_ERROR = 'RECIEVE_CONTENT_ERROR';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export function fetchNavigation() {

	return (dispatch) => {
		
		return fetch(`/api/navigation`)
		.then((res) => {
			if (!res.ok) throw res.statusText; 
			return res.json();
		})
		.then((body) => {
			dispatch(recieveNavigation(body));
		})
		.catch(err => {
			console.log(err);
		})
	}

}

function recieveNavigation(navigation) {
	return {
		type: RECIEVE_NAVIGATION,
		navigation
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
				throw {
					statusCode: res.status,
					message: res.statusText
				};
				return;
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