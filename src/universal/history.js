// creates an appropriate history object for client or server side
import { createHistory, createMemoryHistory } from 'history';
import { canUseDOM } from 'history/lib/ExecutionEnvironment';

export default (url = '/') => {
	if (canUseDOM) {
		return createHistory(); // ignore the given url, let the browser url determine this
	} else {
		return createMemoryHistory([url]);
	}
}