// this is just for prettification, it is completely optional
import { html_beautify } from 'js-beautify';
import { inspect } from 'util';
export default (htmlOutput, state) => {
	console.log(html_beautify(htmlOutput));
	console.log(inspect(state, { depth: 1}));
}