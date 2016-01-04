import { universal } from '../index';

export const reqAsAction = req => {

	// this is a little strange
	const reqAction = req.body;

	// Note that we force the url and method to match the 
	// actual HTTP url and method to prevent possible abuse.
	return universal.routeActions.create({
		url: req.originalUrl,
		method: req.method,
		body: reqAction.body || {},
		headers: reqAction.headers
	});
};

export const finish = (req, res) => {
	const action = reqAsAction(req);
	action.body = {};
	action.headers = {};
	action.statusCode = res.statusCode || 200;
	return action;
};

export const redirect = (req, location) => {
	const action = reqAsAction(req);
	action.body = {};
	action.headers = {};
	action.statusCode = 302;
	action.headers.location = location;
	return action;
};

export const isRouteAction = obj => obj && obj.type === universal.routeActions.ROUTE_TYPE;