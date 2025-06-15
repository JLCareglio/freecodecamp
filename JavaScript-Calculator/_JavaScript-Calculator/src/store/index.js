import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
	reducer: {
		calculator: calculatorReducer,
		history: historyReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
