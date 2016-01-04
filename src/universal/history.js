// creates an appropriate history object for client or server side
import history from 'history';
import { canUseDOM } from 'history/lib/ExecutionEnvironment';

export const createHistory = (url = '/') => {
	if (canUseDOM) {
		return history.createHistory(); // ignore the given url, let the browser url determine this
	} else {
		return history.createMemoryHistory([url]);
	}
}