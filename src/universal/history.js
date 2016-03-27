// creates an appropriate history object for client or server side
import * as history from 'history';
import { canUseDOM } from 'history/lib/ExecutionEnvironment';
import { useRouterHistory } from 'react-router'; // this pollution is unfortunate but necessary

export const createHistory = options => {
	if (canUseDOM) {
		return useRouterHistory(history.createHistory)(options); 
	} else {
		// the server-side must start with an initial URL to begin rendering
		if (!options.entries) {
			options.entries = ['/'];
		}
		return useRouterHistory(history.createMemoryHistory)(options);
	}
}