import { connect } from 'react-redux';
import Menu from '../components/Menu.js';
import { changeLanguage } from '../actions/actions.js';

const mapStateToProps = state => {
	return {
		links: state.navigation,
		currentLanguage: state.language
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setLanguage: (languageCode) => {
			dispatch(changeLanguage(languageCode));
		}
	}
}

const VisibleMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default VisibleMenu;