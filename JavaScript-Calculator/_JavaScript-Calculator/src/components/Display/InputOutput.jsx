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

		if (lastInput === "number") {
			const numbers = expression.split(/[+\-*/×÷]/);
			return numbers[numbers.length - 1] || "0";
		}

		if (lastInput === "operator") {
			const lastChar = expression[expression.length - 1];
			if (lastChar && /[+\-*/×÷]/.test(lastChar)) {
				return lastChar;
			}
			return "";
		}

		return currentValue || "0";
	};

	return (
		<div
			id={id}
			className={`min-h-[3rem] text-3xl font-medium text-right px-4 pb-2 pt-1 overflow-x-auto whitespace-nowrap text-white font-mono scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 ${className}`}
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
