import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log("action type: ", action.type);
  console.log("action payload: ", action.payload);
  console.log("current state: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistconfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistconfig, rootReducer);

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
