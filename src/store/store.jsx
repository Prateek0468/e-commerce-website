import { compose, createStore, applyMiddleware } from "redux";
import { logger as loggerMiddleware } from "redux-logger";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import thunk from "redux-thunk";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

// action dispatch hits middleware before rootreducer

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }

//   console.log("type", action.type);
//   console.log("payload", action.payload);
//   console.log("currentState", store.getState());

//   next(action);

//   console.log("nextState", store.getState());
// };

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && loggerMiddleware,
  sagaMiddleware
].filter(Boolean);

// if we are not in prouductin and there is a window object(which is in dev mode)
// and we have redux dev tools exist. then use this compose otherwise default
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
