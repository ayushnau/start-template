import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import webAuthSlice from "./src/webAuthSlice";
import webUserSlice from "./src/webUserSlice";
import webHomeScreenSlice from "./src/webHomeScreenSlice";

let reducers = combineReducers({
	webAuthSlice: webAuthSlice,
	webUserSlice: webUserSlice,
	webHomeScreenSlice: webHomeScreenSlice,
});

const persistConfig = {
	key: "root",
	storage: storage,
	whiteList: ["webAuth", "webUser", "homeScreen"],
	blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const websiteStore = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

const webSitePersistor = persistStore(websiteStore);

export { websiteStore, webSitePersistor };
