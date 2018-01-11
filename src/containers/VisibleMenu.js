import { connect } from 'react-redux';
import Menu from '../components/Menu.js';
import { changeLanguage, showHideMenu } from '../actions/actions.js';

const mapStateToProps = state => {

	let path = state.activePage.next_path ? state.activePage.next_path : state.activePage.path;

	let currentSectionId = 0;
	let sectionInfo = null;
	let currentPage = state.pages[path];
	if(currentPage) {
		currentSectionId = currentPage.parentPage_id ? currentPage.parentPage_id : currentPage.id;
		Object.keys(state.pages).forEach(path => {
		    if(state.pages[path].id === currentSectionId) {
		    	sectionInfo = {
		    		name: state.pages[path].name,
		    		path: path
		    	}
		    }
		});
	}



	return {
		links: state.navigation,
		currentLanguage: state.language,
		showMenu: state.showMenu,
		currentSectionId,
		sectionInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setLanguage: (languageCode) => {
			dispatch(changeLanguage(languageCode));
		},
		showHide: () => {
			dispatch(showHideMenu());
		}
	}
}

const VisibleMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default VisibleMenu;