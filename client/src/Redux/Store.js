import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { persistStore } from "redux-persist";

import reducers from "./Reducers";
// const reducer = combineReducers({
//   ...reducers,
// });

const middleware = [thunk];
// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

function configureStore(initialState) {
  const middlewares = [thunk];

  const composeEnhancers =
    (typeof window != "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    combineReducers({
      ...reducers,
      // router: routerReducer,
    }),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  return { store, persistor };
}
export default configureStore;
