import { createHistory } from './universal/history';
import { createRouterComponent } from './universal/react-router';
import { createStore, render } from './universal/react-redux';
export const universal = { createHistory, createRouterComponent, createStore, render };

import serverRedouter from './server/middleware';
export const server = { redouter: serverRedouter };

import routeTrigger from './client/route-trigger';
import requestRedux from './client/request';

export const client = { routeTrigger, requestRedux };