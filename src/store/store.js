import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./persistConfig";

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persisted store
const persistor = persistStore(store);
// const persistorClear = persistor.purge();

export { store, persistor };
