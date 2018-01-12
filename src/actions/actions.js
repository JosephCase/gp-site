import scroll from 'scroll';

export const RECIEVE_ENTIRE_STATE = 'RECIEVE_ENTIRE_STATE';
export const CHANGE_PAGE_START = 'CHANGE_PAGE_START';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';
export const TOGGLE_SHOWHIDE_MENU = 'TOGGLE_SHOWHIDE_MENU';
export const PAGE_NOT_FOUND = 'PAGE_NOT_FOUND';

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

export function navigate(path) {

	return (dispatch, getState) => {

		if(window) {
			var doc = document.documentElement;
			let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
			if(top < (window.innerHeight - 50)) {				
				scroll.top(document.documentElement, window.innerHeight - 50);	
				scroll.top(document.body, window.innerHeight - 50);
			}
		}

		if(path != getState().activePage.path) {

			dispatch(changePageStart(path));

			setTimeout(() => {
				if(window) {
					window.scroll(0, window.innerHeight - 50);
				}
				if(pageExists(getState(), path)) {
					return dispatch(changePage(path));
				} else {
					return dispatch(pageNotFound(path));
				}
			}, 300);
		}
	}

}

function changePageStart(path) {
	return {
		type: CHANGE_PAGE_START,
		path
	}
}

function changePage(path) {
	return {
		type: CHANGE_PAGE,
		path
	}
}

function pageNotFound(path) {
	return {
		type: PAGE_NOT_FOUND
	}
}

function pageExists(state, path) {
	return(state.pages[path] ? true : false)
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
