import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import {fork, all} from "redux-saga/effects";

import reducers from "./reducers";
import sagas from "./sagas";

// Redux devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Sagas
const sagaMiddleware = createSagaMiddleware();

// Store
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Initialize sagas
sagaMiddleware.run(function* rootSaga() {
  yield all(sagas.flat().map(saga => fork(saga)));
});

// Load app
store.dispatch({type: "app/BOOT"});

// Export store
export default store;
