import { createSlice } from "@reduxjs/toolkit";

const HISTORY_KEY = "calculator_history";

const loadHistoryFromStorage = () => {
	try {
		const serializedHistory = localStorage.getItem(HISTORY_KEY);
		if (serializedHistory === null) return [];
		return JSON.parse(serializedHistory);
	} catch (err) {
		console.warn("Failed to load history from localStorage", err);
		return [];
	}
};

const saveHistoryToStorage = (history) => {
	try {
		const serializedHistory = JSON.stringify(history);
		localStorage.setItem(HISTORY_KEY, serializedHistory);
	} catch (err) {
		console.warn("Failed to save history to localStorage", err);
	}
};

const initialState = {
	history: loadHistoryFromStorage(),
};

const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		addToHistory: (state, action) => {
			const { expression, result } = action.payload;

			const operators = /[+\-×÷%]/;
			const endsWithOperator = /[+\-×÷%]$/.test(expression);
			const hasOperator = operators.test(expression);
			const isSingleNumber = /^[\d.]+$/.test(expression.trim());

			if (hasOperator && !endsWithOperator && !isSingleNumber) {
				const newHistory = [
					...state.history,
					{
						id: Date.now(),
						expression,
						result,
						timestamp: new Date().toISOString(),
					},
				];

				// Keep only the last 10 items
				const limitedHistory = newHistory.slice(-10);
				state.history = limitedHistory;
				saveHistoryToStorage(limitedHistory);
			}
		},
		clearHistory: (state) => {
			state.history = [];
			localStorage.removeItem(HISTORY_KEY);
		},
	},
});

export const { addToHistory, clearHistory } = historySlice.actions;
export const selectHistory = (state) => state.history.history;

export default historySlice.reducer;
