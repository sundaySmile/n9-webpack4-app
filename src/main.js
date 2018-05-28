import "./main.css";

// require("./index.html");
import printMe from './print.js';
import avatarURL from './images/link.jpg';

var a = async (args) => {
	const { a, b } = args;
	let c = 0;
	if (a > 0) c = 9;
  await console.log('start babel', c, b);
  console.log('Done');
}
a({ a: 2, b: 11 });
printMe();

const container = document.querySelector('#root');
const avatar = document.createElement('img');
avatar.src = avatarURL;
container.appendChild(avatar);