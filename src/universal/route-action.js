export const ROUTE_TYPE = '@@redouter/ROUTE';
export const create = ({ url, method, body, headers })=> ({
	type: ROUTE_TYPE, url, method, body, headers
});

export const GET = ({ url, headers = {} }) => create({ method: 'GET', url, headers});
export const POST = ({ url, body = {}, headers = {} }) => create({ method: 'POST', url, body, headers});