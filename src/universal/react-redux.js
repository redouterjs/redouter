// this file provides redux-specific functionality
import { Provider } from 'react-redux';
import * as redux from 'redux';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { canUseDOM } from 'history/lib/ExecutionEnvironment';

const reduxify = (component, store) => <Provider store={store}>{component}</Provider>;

export const createStore = ({ reducer, initialState }, ...middlewares) => redux.applyMiddleware(...middlewares)(redux.createStore)(reducer, initialState);
export const render = (Component, store, targetDOMElement) => {
	const FinalComponent = reduxify(Component, store);

	if (canUseDOM) {
		if (!targetDOMElement) {
			throw new Error('Client-side rendering requires target DOM element to be specified');	
		} else {
			return ReactDOM.render(FinalComponent, targetDOMElement);
		}
	} else {
		return renderToString(FinalComponent);
	}
};