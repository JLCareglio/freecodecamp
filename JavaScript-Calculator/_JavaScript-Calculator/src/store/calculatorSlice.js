import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	expression: "0",
	currentValue: "0",
	lastInput: null,
	lastOperator: null,
	resetOnNextInput: false,
	lastResult: null,
};

const calculatorSlice = createSlice({
	name: "calculator",
	initialState,
	reducers: {
		appendNumber: (state, action) => {
			const number = action.payload;

			if (state.resetOnNextInput) {
				state.expression = number === "." ? "0." : number;
				state.currentValue = state.expression;
				state.resetOnNextInput = false;
				return;
			}

			if (number === "." && state.currentValue.includes(".")) {
				return;
			}

			if (state.currentValue === "0" && number !== ".") {
				state.currentValue = number;
			} else {
				state.currentValue += number;
			}

			state.expression =
				state.expression === "0" && number !== "."
					? number
					: state.expression + number;

			state.lastInput = "number";
		},

		setOperator: (state, action) => {
			const operator = action.payload;
			const lastChar = state.expression.slice(-1);
			const operators = ["+", "-", "×", "÷", "%"];

			// Handle negative numbers
			if (state.expression === "0" && operator === "-") {
				state.expression = "-";
				state.currentValue = "-";
				state.lastInput = "operator";
				state.lastOperator = operator;
				return;
			}

			// Handle parentheses
			if (operator === "()") {
				// Count open and close parentheses to determine what to add
				const openParens = (state.expression.match(/\(/g) || []).length;
				const closeParens = (state.expression.match(/\)/g) || []).length;

				// If we need to add an opening parenthesis
				if (
					openParens <= closeParens ||
					operators.includes(lastChar) ||
					state.expression === "0" ||
					state.lastInput === "operator"
				) {
					state.expression += "(";
				} else {
					state.expression += ")";
				}
				state.currentValue = state.expression;
				state.lastInput = "number";
				state.resetOnNextInput = false;
				return;
			}

			// Handle consecutive operators
			if (state.lastInput === "operator") {
				// If the last character is a minus and we're adding another operator
				if (lastChar === "-" && operator !== "-") {
					// If the character before the minus is also an operator, replace both
					const secondLastChar =
						state.expression.length > 1 ? state.expression.slice(-2, -1) : "";
					if (operators.includes(secondLastChar)) {
						state.expression = state.expression.slice(0, -2) + operator;
					} else {
						state.expression = state.expression.slice(0, -1) + operator;
					}
				} else if (operator !== "-") {
					// Replace the last operator with the new one
					state.expression = state.expression.slice(0, -1) + operator;
				} else if (operator === "-" && !state.expression.endsWith("-")) {
					// Allow adding a minus after another operator
					state.expression += operator;
				}
			} else {
				// Add operator after a number or closing parenthesis
				state.expression += operator;
			}

			state.currentValue = operator;
			state.lastInput = "operator";
			state.lastOperator = operator;
			state.resetOnNextInput = false;
		},

		calculate: (state) => {
			if (state.lastInput === "operator") {
				state.expression = state.expression.slice(0, -1);
			}

			try {
				// First, check for balanced parentheses
				const openParens = (state.expression.match(/\(/g) || []).length;
				let closeParens = (state.expression.match(/\)/g) || []).length;

				// Add missing closing parentheses
				let expr = state.expression;
				while (openParens > closeParens) {
					expr += ")";
					closeParens++;
				}

				// Replace × with * and ÷ with / for evaluation
				expr = expr.replace(/×/g, "*").replace(/÷/g, "/");

				// Handle percentage operations
				expr = expr.replace(/([0-9.]+)%/g, "($1/100)");

				// Use Function constructor to safely evaluate the expression
				const result = new Function(`return ${expr}`)();
				const roundedResult = Number.parseFloat(result.toFixed(10));

				state.lastResult = {
					expression: state.expression,
					result: roundedResult,
				};

				state.expression = roundedResult.toString();
				state.currentValue = roundedResult.toString();
				state.resetOnNextInput = true;
				state.lastInput = "equals";
			} catch (error) {
				console.error("Calculation error:", error);
				state.expression = "Error";
				state.currentValue = "Error";
				state.resetOnNextInput = true;
			}
		},

		clear: (state) => {
			return { ...initialState };
		},

		loadFromHistory: (state, action) => {
			const { expression, result } = action.payload;
			state.expression = expression;
			state.currentValue = result.toString();
			state.lastResult = { expression, result };
			state.resetOnNextInput = true;
			state.lastInput = "number";
		},
	},
});

// Selectors
export const selectExpression = (state) => state.calculator.expression;
export const selectCurrentValue = (state) => state.calculator.currentValue;
export const selectLastInput = (state) => state.calculator.lastInput;
export const selectLastResult = (state) => state.calculator.lastResult;

export const selectCurrentResult = (state) => {
	const { expression, lastInput } = state.calculator;

	// Don't calculate if there's no operator or incomplete expression
	if (!/[+\-*/×÷]/.test(expression) || lastInput === "operator") {
		return null;
	}

	try {
		// First, replace × with * and ÷ with / for evaluation
		let expr = expression.replace(/×/g, "*").replace(/÷/g, "/");

		// Handle cases where there might be a negative number after an operator
		expr = expr.replace(/([+\-*/])-/g, "$1 -");

		// Use Function constructor to safely evaluate the expression
		const result = new Function(`return ${expr}`)();

		// Format the result to avoid scientific notation for large numbers
		if (Number.isFinite(result)) {
			// Convert to string and remove trailing .0 if it's an integer
			const str = result.toString();
			return str.endsWith(".0") ? str.slice(0, -2) : str;
		}

		return null;
	} catch (error) {
		console.error("Calculation error:", error);
		return null;
	}
};

export const { appendNumber, setOperator, calculate, clear, loadFromHistory } =
	calculatorSlice.actions;

export default calculatorSlice.reducer;
