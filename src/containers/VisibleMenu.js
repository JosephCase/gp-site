import { connect } from 'react-redux';
import Menu from '../components/Menu.js';
import { changeLanguage, showHideMenu } from '../actions/actions.js';

const mapStateToProps = state => {
	return {
		links: state.navigation,
		currentLanguage: state.language,
		showMenu: state.showMenu
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