// Evaluates a mathematical expression string with proper operator precedence
// Supports +, -, *, /, and handles decimal numbers
// Throws an error for invalid expressions
export const evaluateExpression = (expression) => {
	if (!expression) return 0;

	// Remove any whitespace and replace × and ÷ with * and /
	const expr = expression
		.replace(/\s+/g, "")
		.replace(/×/g, "*")
		.replace(/÷/g, "/");

	// Validate the expression
	if (!/^[\d+\-*/.()\s]+$/.test(expr)) {
		throw new Error("Invalid characters in expression");
	}

	// Check for balanced parentheses
	let balance = 0;
	for (const char of expr) {
		if (char === "(") balance++;
		if (char === ")") balance--;
		if (balance < 0) throw new Error("Unbalanced parentheses");
	}
	if (balance !== 0) throw new Error("Unbalanced parentheses");

	// Use Function constructor to safely evaluate the expression
	try {
		// eslint-disable-next-line no-new-func
		const result = new Function(`return (${expr})`)();

		// Handle division by zero
		if (!isFinite(result)) {
			throw new Error("Division by zero");
		}

		return result;
	} catch (error) {
		console.error("Evaluation error:", error);
		throw new Error("Invalid expression");
	}
};

// Formats a number to a string, removing trailing .0 for whole numbers
export const formatNumber = (num) => {
	// If it's an integer, return as string without decimal
	if (Number.isInteger(num)) {
		return num.toString();
	}

	// Otherwise, limit to 10 decimal places and remove trailing zeros
	return num.toFixed(10).replace(/\.?0+$/, "");
};

// Validates if a character can be added to the current expression
export const isValidInput = (currentExpression, char) => {
	if (!currentExpression) return true;

	const lastChar = currentExpression.slice(-1);

	// Don't allow operators at the start (except minus)
	if (currentExpression === "0" && /[+*/]/.test(char)) {
		return false;
	}

	// Don't allow multiple decimal points in a number
	if (char === ".") {
		// Split by operators to get the current number
		const parts = currentExpression.split(/[+\-*/]/);
		const currentNumber = parts[parts.length - 1];
		return !currentNumber.includes(".");
	}

	// Don't allow multiple operators in a row (except for negative numbers)
	if (/[+\-*/]/.test(lastChar) && /[+*/]/.test(char)) {
		return false;
	}

	// Special case for negative numbers after operator
	if (lastChar === "-" && /[+*/]/.test(currentExpression.slice(-2, -1))) {
		return /[0-9(]/.test(char);
	}

	return true;
};
