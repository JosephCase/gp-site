import { connect } from 'react-redux';
import Menu from '../components/Menu.js';
import { changeLanguage, showHideMenu } from '../actions/actions.js';

const mapStateToProps = state => {

	let path = state.activePage.next_path ? state.activePage.next_path : state.activePage.path;

	let currentSectionId = 0;
	let currentPage = state.pages[path];
	if(currentPage) {
		currentSectionId = currentPage.parentPage_id ? currentPage.parentPage_id : currentPage.id;
	}

	return {
		links: state.navigation,
		currentLanguage: state.language,
		showMenu: state.showMenu,
		currentSectionId
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