import main from './lib/index';
import assert from 'assert';

describe('universal', () => {
	describe('history', () => {
		it('should load', () => {
			const history = main.history;
			assert(typeof history === 'function');
		});
	});

	describe('react-router', () => {
		it('should load', () => {
			const reactRouter = main.reactRouter;
			assert(typeof reactRouter === 'function');
		});
	})

	describe('redux', () => {
		it('should load', () => {
			const redux = main.redux;
			assert(typeof redux.reduxify === 'function');
			assert(typeof redux.createStore === 'function');
			assert(typeof redux.render === 'function');
		})
	})
});