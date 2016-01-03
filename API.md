
# universal

## history

* default `(url='/')`

  Automatically creates the appropriate `history` object for the server or the browser. If the browser is the environment, then the `url` parameter is ignored.

## react-router

* default `(routes, history, cb)`

  Generates a React component representing the `react-router` root component, tailored to server or browser. The function is asynchronous because the server-side call is asynchronous as well. For server-side rendering, 3 custom errors can be generated via callback. All errors will have a `statusCode` property, and may contain additional properties

  * `ServerError` - will contain an `error` property.
  * `RedirectError` - will contain a `url` property.
  * `NotFoundError`

  Calling code must handle the errors manually, probably by generating the appropriate `res` response.

## redux

* `reduxify(component, store)`

  Wraps the given component with a `Provider` element and returns the element.

* `createStore({ reducer, initialState }, ...middlewares)`

  Creates a store using the given reducer (root reducer) and initial state, then applies the (optional) varargs middlewares to the store.

* `render(Component, store, targetDOMElement)`

  Renders the given Component using the supplied store. For server-side rendering, the `targetDOMElement` is optional and will be ignored.

# notes

If the API definition for the module is prefixed with "default", then it means the module exports only a single function.

For example, if the module "fruit" exports just a function, then use it as follows:

```
  import fruit from 'fruit';
  fruit(whatever-params)
```

Otherwise assume that the module exports an object. e.g. if the module "fruit" exports 2 named functions "banana" and "mango":

```
import fruit from 'fruit';
fruit.banana(some-params);
fruit.mango(some-other-params);
```
