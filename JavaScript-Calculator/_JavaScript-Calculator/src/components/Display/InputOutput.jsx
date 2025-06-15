import PropTypes from "prop-types";
import React from "react";

const InputOutput = ({
	expression,
	currentValue,
	lastInput,
	className = "",
	id = "display",
}) => {
	const getDisplayValue = () => {
		if (!lastInput) return "0";

		// If the last input was a number, show only the current number being entered
		if (lastInput === "number") {
			// Split by operators but keep them in the result to handle negative numbers
			const parts = expression.split(/([+\-*/×÷%])/);
			// Get the last part which should be the current number
			return parts[parts.length - 1] || "0";
		}

		// If the last input was an operator, show the operator
		if (lastInput === "operator") {
			const lastChar = expression[expression.length - 1];
			if (lastChar && /[+\-*/×÷%]/.test(lastChar)) {
				return lastChar;
			}
			return "";
		}

		return currentValue || "0";
	};

	return (
		<div
			id={id}
			className={`text-3xl font-medium text-right px-4 overflow-x-auto whitespace-nowrap text-white font-mono scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 ${className}`}
			aria-live="polite"
			aria-atomic="true"
		>
			{getDisplayValue()}
		</div>
	);
};

InputOutput.propTypes = {
	expression: PropTypes.string.isRequired,
	currentValue: PropTypes.string.isRequired,
	lastInput: PropTypes.oneOf(["number", "operator", "equals", "clear", null]),
	className: PropTypes.string,
	id: PropTypes.string,
};

export default InputOutput;
