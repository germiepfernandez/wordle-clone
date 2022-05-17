import {
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { wordApi } from "./api/wordApi";

const rootReducer = combineReducers({
	[wordApi.reducerPath]: wordApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		wordApi.middleware,
	],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
