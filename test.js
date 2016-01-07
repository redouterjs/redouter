/* global describe it */
import { universal, server, client } from './src/index';
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

});

describe('server', () => {
	it('should have a redouter function', () => {
		assert(typeof server.redouter === 'function');
	});
});

describe('client', () => {
	it('should have a requestRedux middleware', () => {
		assert(typeof client.requestRedux === 'function');
		assert(client.requestRedux.length === 1);
	});

	it ('should have a routeTrigger function', () => {
		assert(typeof client.requestRedux === 'function');
		assert(client.routeTrigger.length === 2);
	});
});