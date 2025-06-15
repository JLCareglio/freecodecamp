import PropTypes from "prop-types";
import React from "react";
import CurrentResult from "./CurrentResult";
import Expression from "./Expression";
import InputOutput from "./InputOutput";

const Display = ({
	expression,
	currentValue,
	currentResult,
	lastInput,
	className = "",
}) => {
	return (
		<div
			className={`bg-gray-700 rounded-lg shadow-inner mb-4 overflow-hidden border border-gray-600 ${className}`}
		>
			{/* First row: Expression */}
			<Expression
				value={expression}
				className="min-h-[2rem] text-gray-300 text-right px-4 pt-2 text-sm"
			/>

			{/* Second row: Result with = */}
			<CurrentResult
				result={currentResult}
				className="text-blue-300 font-medium px-4 py-1 text-right"
			/>

			{/* Third row: Current input */}
			<InputOutput
				expression={expression}
				currentValue={currentValue}
				lastInput={lastInput}
				id="display"
			/>
		</div>
	);
};

Display.propTypes = {
	expression: PropTypes.string.isRequired,
	currentValue: PropTypes.string.isRequired,
	currentResult: PropTypes.string,
	lastInput: PropTypes.oneOf(["number", "operator", "equals", "clear", null]),
	className: PropTypes.string,
};

export default Display;
