import { connect } from 'react-redux';
import MainContent from './MainContent.js';
import { fetchPage } from '../actions/actions.js';

const mapStateToProps = state => {
    return state[state.activePath];
}

const ActivePageContent = connect(
    mapStateToProps
)(MainContent)

export default ActivePageContent;