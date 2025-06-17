import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	history: [],
};

const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		addToHistory: (state, action) => {
			const { expression, result } = action.payload;
			state.history.push({
				id: Date.now(),
				expression,
				result,
				timestamp: new Date().toISOString(),
			});
			if (state.history.length > 10) state.history.shift();
		},
		clearHistory: (state) => {
			state.history = [];
		},
	},
});

export const { addToHistory, clearHistory } = historySlice.actions;
export const selectHistory = (state) => state.history.history;

export default historySlice.reducer;
