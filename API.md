
# universal

```
import { universal } from 'redouter'
```

This module provides code that is environment agnostic. Most of it is specific to the [react][u1], [redux (react-redux)][u2] and/or [react-router][u3] frameworks.

[u1]: https://github.com/facebook/react
[u2]: https://github.com/rackt/react-redux
[u3]: https://github.com/rackt/react-router

* `createHistory(url='/')`

  Automatically creates the appropriate `history` object for the server or the browser. If the browser is the environment, then the `url` parameter is ignored.

* `createRouterComponent(routes, history, cb)`

  Generates a React component representing the `react-router` root component, tailored to server or browser. The function is asynchronous because the server-side call is asynchronous as well. For server-side rendering, 3 custom errors can be generated via callback. All errors will have a `statusCode` property, and may contain additional properties

  * `ServerError` - will contain an `error` property.
  * `RedirectError` - will contain a `url` property.
  * `NotFoundError`

  Calling code must handle the errors manually, probably by generating the appropriate `res` response.

* `createStore({ reducer, initialState }, ...middlewares)`

  Creates a store using the given reducer (root reducer) and initial state, then applies the (optional) varargs middlewares to the store.

* `render(Component, store, targetDOMElement)`

  Renders the given Component using the supplied store. 

  * For browser rendering, `targetDOMElement` is required, and an error is thrown if not present.
  * For server rendering, `targetDOMElement` is ignored.

# server

```
import { server } from 'redouter'
```

Providers server-side middleware that binds redux helper methods to `res` and accomodates `routeActions`.

* `redouter({ rootReducer, initialState, routes, templater (optional) })`
  
  Generates the server-side redouter middleware. The middleware creates a new redux store which is used in combination with server-side dispatched actions to create a representative state for server-side rendering.

  * `rootReducer` should be the redux reducer for the store.
  * `initialState` is the initial state of the store
  * `routes` should be the collection of react-router routes for the application
  * `templater` is optional, but you will probably override it. See below for details.

  The middleware augments the `res` object in express with the following methods:

  * `getState()` returns the current state of the store.
  * `dispatch(action)` dispatches an action. This is actually queued until either `universalRender` or `universalRedirect` is invoked.
  * `universalRender()` returns either a JSON response (if the request is an XMLHTTPRequest) or otherwise runs the action queue and renders a result server-side.
  * `universalRedirect(location)` ends with a redirect action and either dispatches the JSON queue as normal for XMLHttpRequests, otherwise does a simple server-side redirect. Note that all queued actions are lost in the event of a server-side redirect - this follows with established HTTP patterns. The redirected route will be fully responsible for providing the new data.

## `templater(html, store)`

  The `templater` should be a function that returns a string representing the full, final HTML output rendered server-side. This should include hydration via the redux `store` that is passed in. For example, if not specified, the default templater looks like this:

  ```
return `
  <!doctype html>
  <html>
    <head></head>
    <body><div id="react-container">${html}</div></body>
    <!-- Hydration -->
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
    <script src="js/bundle.js"></script>
  </html>
`;
  ```

  You may use any templating engine you desire to provide the required output. Otherwise by default, as in the example above:

  * React content is rendered in the `#react-container` element in the `body`
  * The global `__INITIAL_STATE__` provides hydration capabilities.
  * It is assumed that a client-side hook is present at `js/bundle.js`.

* client

