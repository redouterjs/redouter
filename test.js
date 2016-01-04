/* global describe it */
import { universal, server } from './src/index';
import assert from 'assert';

describe('universal', () => {

	describe('history', () => {
		it('should have the createHistory function', () => {
			assert(typeof universal.createHistory === 'function');
		});

		it('should correctly create a server-side history', () => {
			const history = universal.createHistory('/pineapple');

			history.listen( ({pathname}) => {
				assert(pathname === '/pineapple');
			});
		});
	});

	describe('react-router', () => {
		it('should have the createRouterComponent function', () => {
			assert(typeof universal.createRouterComponent === 'function');
		});
	});

	describe('react-redux', () => {
		it('should have the render and createStore functions', () => {
			assert(typeof universal.render === 'function');
			assert(typeof universal.createStore === 'function');
		})
	});

	describe('route-action', () => {
		it('should have the correct route type constant and create function', () => {
			assert(universal.routeActions.ROUTE_TYPE === '@@redouter/ROUTE');
			assert(typeof universal.routeActions.create === 'function');
		})
	})
});

describe('redouter', () => {
	it('should have a redouter function', () => {
		assert(typeof server.redouter === 'function');
	});
})