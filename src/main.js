import "./main.css";

// require("./index.html");
import printMe from './print.js';

var a = async (args) => {
	const { a, b } = args;
	let c = 0;
	if (a > 0) c = 9;
  await console.log('start babel', c, b);
  console.log('Done');
}
a({ a: 2, b: 11 });
printMe();

import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from './pages/avatar.js';
 
ReactDOM.render(<Avatar name="Mary"/>, document.getElementById('root'));