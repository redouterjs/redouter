import { createHistory } from './universal/history';
import { createRouterComponent } from './universal/react-router';
import { createStore, render } from './universal/react-redux';
import * as routeActions from './universal/route-action';
export const universal = { createHistory, createRouterComponent, createStore, render, routeActions };

import serverRedouter from './server/middleware';
export const server = { redouter: serverRedouter };
