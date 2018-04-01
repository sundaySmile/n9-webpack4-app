// require("babel-runtime/regenerator");
require("./main.css");
require("./index.html");

var a = async (args) => {
	const { a, b } = args;
	let c = 0;
	if (a > 0) c = 9;
  await console.log('start babel', c, b);
  console.log('Done');
}
a({ a:2, b: 3 });