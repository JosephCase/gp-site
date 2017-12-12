import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			links: []
		}
	}
	componentDidMount() {
		fetch(`/api/navigation`)
		.then((res) => {
			if (!res.ok) throw res.statusText; 
			return res.json();
		})
		.then((body) => {
			this.setState({ links: body })
		})
		.catch(err => {
			console.log(err);
		})
	}
	render() {
		let links = this.state.links.map((link) => {
			return <li key={link.id} ><Link to={link.path}>{link.name}</Link></li>
		});
		return (
			<div className='menu'>
				<ul>{ links }</ul>
				<ul>
					<li>ENG</li>
				</ul>
			</div>
		)
	}
}

export default Menu;