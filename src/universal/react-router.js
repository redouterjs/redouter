// returns a React component that has been wrapped
// by react-router. The intent of the API is to return
// a universal (consistent) result given an input-pair routes + history.
//
// This conceptually returns a single "template". "routes" is
// "all templates", and "history" helps to narrow down which
// template is to be chosen.
//
// The biggest difficulty is defining the "template name", which is
// achieved via "history". Client-side, "history" provides the
// location via the DOM / window API, server-side, "history" has to
// have the location injected.
//
// Again, please note that server-side, you must create a history
// object with a manually defined URL.
import React from 'react'; // eslint-disable-line no-unused-vars
import { Router, RouterContext, match } from 'react-router';
import { canUseDOM } from 'history/lib/ExecutionEnvironment';

class RedirectError extends Error {
	constructor(url) {
		super();
		this.url = url;
		this.statusCode = 302;
	}
}

class ServerError extends Error {
	constructor(err) {
		super();
		this.statusCode = 500;
		this.error = err;
	}
}

class NotFoundError extends Error {
	constructor() {
		super();
		this.statusCode = 404;
	}
}

// because the server side "match" uses async style, we are forced to do the same here
export const createRouterComponent = (routes, { history, createElement }, cb) => {
	if (!history) {
		cb(new Error('You must provide a "createHistory" factory function'));
	} else if (!history.__v2_compatible__) {
		cb(new Error('Please provide a history compatible with react-router 2.x by wrapping the factory function with useRouterHistory'));
	}

	if (canUseDOM) {
		// return a simple router object
		try {
			cb(null, <Router createElement={createElement} history={history}>{routes}</Router>);
		} catch (err) {
			cb(err);
		}
	} else {
		// we enter the murky realm of server-side rendering
		// fun fact - the only way to extract a location from a history object is to listen on it.
		history.listen( ({ pathname }) => {
			match({ routes, location: pathname }, (err, redir, renderProps) => {
				if (err) {
					return cb(new ServerError(err));
				} else if (redir) {
					return cb(new RedirectError(redir.pathname + redir.search));
				} else if (renderProps == null) {
					return cb(new NotFoundError());
				} else {
					renderProps.createElement = createElement;
					cb(null, <RouterContext {...renderProps} />);
				}
			});
		});
	}
}