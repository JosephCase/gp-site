import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({links, currentLanguage, setLanguage}) => (
	<div className='menu'>
		<ul>
		{
			links.map((link) => {
				return <li key={link.id} ><Link to={link.path}>{link.name}</Link></li>
			}) 
		}
		</ul>
		<ul>
			<LanguageButton languageCode='eng' currentLanguage={currentLanguage} onClick={setLanguage} >English</LanguageButton>
			<LanguageButton languageCode='ita' currentLanguage={currentLanguage} onClick={setLanguage} >Italiano</LanguageButton>
		</ul>
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