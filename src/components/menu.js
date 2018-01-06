import React from 'react';
import { Link } from 'react-router-dom';

const Menu = ({links, currentLanguage, currentSectionId, setLanguage, showMenu, showHide}) => (
	<div className={`menu${showMenu ? ' show' : ''}`}>
		<div className="button" onClick={showHide}>		    
			<div></div>
			<div></div>
		    <div></div>
		</div>
		<div className='navigation'>
			<ul>
			{
				links.map((link) => {
					let className = currentSectionId === link.id ? 'active' : '';
					return <li key={link.id} className={className}><Link to={link.path}>{link.name}</Link></li>
				}) 
			}
			</ul>
			<ul className='language'>
				<LanguageButton languageCode='eng' currentLanguage={currentLanguage} onClick={setLanguage}>ENG</LanguageButton>
				<li>/</li>
				<LanguageButton languageCode='ita' currentLanguage={currentLanguage} onClick={setLanguage}>ITA</LanguageButton>
			</ul>
		</div>
	</div>
)

const LanguageButton = ({children, languageCode, currentLanguage, onClick}) => {

	function handleClick() {
		onClick(languageCode);
	}

	let activeClass = (languageCode === currentLanguage) ? 'active' : ''
	return (
		<li onClick={handleClick} className={activeClass}>
			{children}
		</li>
	)
}

export default Menu;