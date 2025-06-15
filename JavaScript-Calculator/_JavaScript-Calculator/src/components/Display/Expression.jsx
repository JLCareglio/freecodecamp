import PropTypes from "prop-types";
import React from "react";

const Expression = ({ value, className = "" }) => {
	// Ensure value is a string and handle potential undefined/null
	const displayValue = value || "";

	return (
		<div
			className={`text-right text-gray-300 text-sm font-mono overflow-x-auto whitespace-nowrap py-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 ${className}`}
			aria-live="polite"
		>
			{displayValue}
		</div>
	);
};

Expression.propTypes = {
	value: PropTypes.string,
	className: PropTypes.string,
};

export default Expression;
