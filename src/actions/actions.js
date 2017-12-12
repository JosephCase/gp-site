export const REQUEST_CONTENT = 'REQUEST_CONTENT';
export const RECIEVE_CONTENT = 'RECIEVE_CONTENT';

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

export function fetchPage(pagePath) {

	return (dispatch) => {

		dispatch(requestContent(pagePath));

		return fetch(`/api${pagePath}`)
		.then((res) => {
			if (!res.ok) return console.log(res.statusText); 
			return res.json();
		})
		.then((body) => {
			dispatch(receivePageContent(pagePath, body));
		})
	}

}