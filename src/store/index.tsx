import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authenticationReducer from "./reducers/authenticationSlice";
import modalReducer from "./reducers/modalSlice";

// Configuração do Redux Persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal"], // Não persiste o estado do modal
};

// Combina os reducers
const combinedReducers = combineReducers({
  authentication: authenticationReducer,
  modal: modalReducer,
});

// Cria o persistedReducer
const persistedReducer = persistReducer(persistConfig, combinedReducers);

// Função para configurar a store
const makeConfiguredStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Desativa a verificação de serialização para Redux Persist
      }),
  });

// Tipagem do Redux Persist (inclusão do __persistor)
export interface AppStore extends ReturnType<typeof makeConfiguredStore> {
  __persistor: ReturnType<typeof persistStore>; // Tipando a propriedade __persistor
}

// Função para criar a store dependendo se está no servidor ou cliente
export const makeStore = () => {
  const isServer = typeof window === "undefined";

  const store = makeConfiguredStore();

  // No cliente, inicializa o persistor
  if (!isServer) {
    (store as AppStore).__persistor = persistStore(store); // Tipo explícito para a store
  }

  return store;
};

// Tipos para facilitar o uso da store no código
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
