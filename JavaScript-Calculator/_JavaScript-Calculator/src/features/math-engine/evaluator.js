// Evaluates a mathematical expression string with proper operator precedence
// Throws an error for invalid expressions
export const evaluateExpression = (expression) => {
	if (!expression) return 0;

	// Remove any whitespace and replace × and ÷ with * and /
	const expr = expression
		.replace(/\s+/g, "")
		.replace(/×/g, "*")
		.replace(/÷/g, "/");

	if (!/^[\d+\-*/.()\s]+$/.test(expr))
		throw new Error("Invalid characters in expression");

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
		const result = new Function(`return (${expr})`)();
		if (!Number.isFinite(result)) throw new Error("Division by zero");
		return result;
	} catch (error) {
		console.error("Evaluation error:", error);
		throw new Error("Invalid expression");
	}
};

// Formats a number to a string, removing trailing .0 for whole numbers
export const formatNumber = (num) => {
	if (Number.isInteger(num)) return num.toString();
	return num.toFixed(10).replace(/\.?0+$/, "");
};

// Validates if a character can be added to the current expression
export const isValidInput = (currentExpression, char) => {
	if (!currentExpression) return true;

	const lastChar = currentExpression.slice(-1);

	// Don't allow operators at the start (except minus)
	if (currentExpression === "0" && /[+*/]/.test(char)) return false;

	// Don't allow multiple decimal points in a number
	if (char === ".") {
		const parts = currentExpression.split(/[+\-*/]/);
		const currentNumber = parts[parts.length - 1];
		return !currentNumber.includes(".");
	}

	// Don't allow multiple operators in a row (except for negative numbers)
	if (/[+\-*/]/.test(lastChar) && /[+*/]/.test(char)) return false;

	// Special case for negative numbers after operator
	if (lastChar === "-" && /[+*/]/.test(currentExpression.slice(-2, -1)))
		return /[0-9(]/.test(char);

	return true;
};
