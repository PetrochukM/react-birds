'use strict';

import React from 'react';
import Birds from 'lib/birds.js';
import './style.scss';

export default class BirdsView extends React.Component {
	componentDidMount() {
		Birds.init(React.findDOMNode(this.refs.canvas));
	}

	render() {
		return ( 
			<canvas className = "birds" ref = "canvas" > < /canvas>
		);
	}
}