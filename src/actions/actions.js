export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECIEVE_CONTENT = 'RECIEVE_CONTENT';
export const RECIEVE_CONTENT_ERROR = 'RECIEVE_CONTENT_ERROR';

function requestContent(pagePath) {
	return {
		type: REQUEST_CONTENT,
		pagePath
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

export function fetchPage(pagePath) {

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