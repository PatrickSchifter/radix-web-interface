import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authenticationReducer from "./reducers/authenticationSlice";
import modalReducer from "./reducers/modalSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal", "snackbar", "notifications"],
};

const combinedReducers = combineReducers({
  authentication: authenticationReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const makeConfiguredStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, combinedReducers);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
