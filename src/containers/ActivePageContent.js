import { connect } from 'react-redux';
import MainContent from '../components/MainContent.js';

const mapStateToProps = state => {
	let activePath = state.activePage.path;
	let pageContent = state.pages[activePath];
	if(!pageContent) {
		return state.activePage; 
	} else if(pageContent.type == 'section') {
		return Object.assign({}, state.activePage, pageContent);
	} else if(pageContent.type == 'page') {
		let filteredContent = pageContent.content.filter(content => {
			return (content.language == state.language || content.language == 'NUL' || content.language == null);
		})
		return Object.assign(
			{},
			state.activePage,
			pageContent,
			{
				content: filteredContent
			}
		)
	}
}

const ActivePageContent = connect(
    mapStateToProps
)(MainContent)

export default ActivePageContent;