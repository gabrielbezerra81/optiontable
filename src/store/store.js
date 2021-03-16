import { createStore, applyMiddleware } from "redux";
import createSaga from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./ducks";
import sagas from "./sagas";

let middlewares = null;

const sagaMiddleware = createSaga();

if (process.env.NODE_ENV === "development") {
  middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));
} else {
  middlewares = applyMiddleware(sagaMiddleware);
}

const store = createStore(reducers, middlewares);

sagaMiddleware.run(sagas);

export default store;
