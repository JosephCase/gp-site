import { connect } from 'react-redux';
import MainContent from '../components/MainContent.js';
import { fetchPage } from '../actions/actions.js';

const mapStateToProps = state => {
	return Object.assign({}, state.activePage, state.pages[state.activePage.path])
    // return state.pages[state.activePage.path];
}

const ActivePageContent = connect(
    mapStateToProps
)(MainContent)

export default ActivePageContent;