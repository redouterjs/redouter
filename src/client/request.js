/* global fetch */
/* eslint no-unused-vars: [2, {"argsIgnorePattern": "store"}]*/

// this is a redux middlware that handles route-action type actions
// it sends a representative XHR with the action as the body and waits
// for responses from the server, which should be in the form of additional
// redux actions. The action queue received should eventually terminate with a
// final route action, representing the final HTTP response / statusCode (which
// could be a redirect etc.)
import es6promise from 'es6-promise';
import 'isomorphic-fetch'; // do I still need this?
import { isRouteAction } from 'route-action';
import { PROCESSING, isErrorCode, isRedirect } from '../httpcodes';

es6promise.polyfill();

export default history => store => next => action => {

	// if it not a route-action, passthrough
	if (!isRouteAction(action)) {
		return next(action);
	}

	// as the action is essentially mimicking a HTTP request
	// we use similar HTTP status codes. Apparently, 102 means "processing"
	// TODO: Make an immutable clone
	action.statusCode = PROCESSING;
	next(action);

	// we need to prepare a payload for the fetch method.
	const payload = {
		method: action.method || 'GET',
		credentials: 'same-origin' // for cookies to be sent in the headers
	};

	// transfer headers from the route action to the payload,
	// and set other necessary headers
	payload.headers = {
		...action.headers,
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest' // this guarantees req.xhr === true server-side
	};

	if (!/^(GET|HEAD)$/.test(payload.method)) {
		payload.body = JSON.stringify(action);
	}

	return fetch(action.url, payload).then(res => {
		if (isErrorCode(res.status)) {
			console.log(`[client] HTTP Error ${res.status}`);
			action.statusCode = res.statusCode;
			action.error = { message: `An unknown error occurred, status ${res.statusCode}` };
			return next(action);
		}
		
		console.log('[client] retrieving and dispatching actions from server');
		res.json().then(actions => {
			// we now have an array of actions. each action
			// can populate the store, but the final action
			// must be route action that will mark the request
			// either as a success or failure
			let lastAction = actions.pop();

			actions.forEach(action => next(action));

			// massage the last action a little, depending on the status code
			if (!isErrorCode(lastAction.statusCode) && !lastAction.error) {
				lastAction.error = {
					message: 'An unknown error occurred, status code ' + lastAction.statusCode
				};
			}

			// Dispatch the last action. If the action has a redirect, then perform it
			next(lastAction);
			if (isRedirect(lastAction.statusCode) && lastAction.headers.location) {
				console.log(`[client] performing in-browser redirection to ${lastAction.headers.location}`);
				history.push(lastAction.headers.location); // history = react-router
			}
		});
	}).catch(err => {
		console.error(err);
	});

};