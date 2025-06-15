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
			className={`bg-gray-700 rounded-lg shadow-inner overflow-hidden border border-gray-600 mb-2 ${className}`}
		>
			{/* First row: Expression */}
			<Expression
				value={expression}
				className="text-gray-300 text-right px-4 pt-1"
			/>

			{/* Second row: Result with = */}
			<CurrentResult
				result={currentResult}
				className="text-blue-300 font-medium px-4 text-right"
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
