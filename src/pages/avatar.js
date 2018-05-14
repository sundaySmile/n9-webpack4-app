import React, { Component } from 'react';
import propTypes from 'prop-types';
// import styles from './Avatar.css';
import avatarURL from '../images/link.jpg';

class Avatar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarURLs: avatarURL
		}
	}
  render() {
    return (
			<div >
				<img src={this.state.avatarURLs} title="avatar" />
				<p> {this.props.name} </p>
			</div>
    );
  }
}
Avatar.propTypes = {
	avatarURLs: propTypes.string,
	name: propTypes.string
}

export default Avatar;
