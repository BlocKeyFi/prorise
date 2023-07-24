import storage from "redux-persist/lib/storage";
import { createMigrate, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userReducer from "./slice/userSlice";
import exchangeReducer from "./slice/exchangeSlice";
import leaderboardReducer from "./slice/leaderboardSlice";

// Define migrations if needed
const migrations = {
  0: (state) => {
    // Migration logic for version 0
    return { ...state };
  },
  // Add more migrations as needed
};

// Define the Redux Persist configuration
const persistConfig = {
  key: "root",
  version: 0,
  storage,
  migrate: createMigrate(migrations, { debug: false }),
};

// Combine your reducers
const appReducer = combineReducers({
  user: userReducer,
  exchange: exchangeReducer,
  leaderBoard: leaderboardReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "user/logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer, persistConfig };
