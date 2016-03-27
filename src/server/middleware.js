import { universal } from '../index';
import { reqAsAction, finish, redirect } from './actions';
import { isRouteAction } from 'route-action';
import log from '../extras/log';

// the whole __INITIAL_STATE__ thing is from https://goo.gl/bOrXPH
const defaultTemplater = (html, store) => {
	return `
<!doctype html>
<html>
	<head></head>
	<body><div id="react-container">${html}</div></body>
	<!-- Hydration -->
	<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
	<script src="js/bundle.js"></script>
</html>`;
}

// TODO: at some point, we may want to add the concept of a custom renderer. Maybe.
const serverRenderer = ({ store, routes, templater, createElement }, req, res) => {

	// there is no need to expose the history, because this is server-side,
	// which needs the history for exactly one purpose - rendering
	const history = universal.createHistory({ entries: [ req.originalUrl ]});
	universal.createRouterComponent(routes, { history, createElement }, (err, Component) => {
		if (err) {
			if (err.statusCode) {
				res.status(err.statusCode)
			}

			switch (err.constructor.name) {
				case 'RedirectError':
					return res.redirect(err.url);
				case 'NotFoundError':
					return res.end();
				case 'ServerError':
					return res.send(err.error.stack);
				default:
					return res.status(500).send(err); // unexpected error
			}
		}

		const html = universal.render(Component, store);
		const fullHtml = templater(html, store);
		log(fullHtml, store.getState());
		
		return res.status(200).send(fullHtml);
	});
};

// adds "dispatch-like" functionality to response object
export default ({ rootReducer, initialState, routes, templater = defaultTemplater }, ...middlewares) => (req, res, next) => {

	const actionQueue = [];
	const store = universal.createStore({ reducer: rootReducer, initialState }, ...middlewares);

	// declare an "action" on the request
	req.action = reqAsAction(req);

	// utility methods
	res.getState = () => store.getState();

	// we augment the response with an action and actionRedirect
	// both of which will provide specialized responses for redux actions
	res.dispatch = (action) => {
		if (!(action && action.type)) {
			throw new Error('Invalid action queued for dispatch - '+action);
		}

		console.log('[server] dispatch action = ' + JSON.stringify(action, null, 4));
		actionQueue.push(action); 
	};

	res.universalRender = () => {
		// the last action must be a route action
		if (!isRouteAction(actionQueue.slice(-1)[0])) {
			actionQueue.push(finish(req, res));
		}

		if (req.xhr) {
			// respond with JSON containing the action
			console.log('[server] universalRender | xhr | respond with JSON queue');
			return res.json(actionQueue);
		} else {
			// dispatch the action and render server-side
			console.log('[server] universalRender | server-side | dispatch all and respond with HTML');
			actionQueue.forEach( action => store.dispatch(action) );
			serverRenderer({ store, routes, templater }, req, res);
		}
	}

	res.universalRedirect = location => {
		res.dispatch(redirect(req, location)); // end with a redirect action

		if (req.xhr) {
			console.log('[server] dispatchRedirect | xhr | ending with redirect action');
			res.universalRender(); // terminate. We should not do anything else after a redirect
		} else {
			res.redirect(location); // a server-side redirect always loses all state (or queued actions in this case)
		}
	};

	console.log(`[server] req.action ${JSON.stringify(req.action, null, 4)}`);
	next();
};