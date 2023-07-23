import { Middleware } from "redux";

import { RootState } from "../store/store";

export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!action.type) return next(action);

    console.log("action type: ", action.type);
    console.log("action payload: ", action.payload);
    console.log("current state: ", store.getState());

    next(action);

    console.log("next state: ", store.getState());
  };
