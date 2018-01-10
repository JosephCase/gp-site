import { connect } from 'react-redux';
import Header from '../components/Header.js';
import { fixHeader } from '../actions/actions.js';

const mapDispatchToProps = dispatch => {
	return {
		fixHeader: (fix) => {
			dispatch(fixHeader(fix));
		}
	}
}

const VisibleMenu = connect(
    null,
    mapDispatchToProps
)(Header)

export default VisibleMenu;