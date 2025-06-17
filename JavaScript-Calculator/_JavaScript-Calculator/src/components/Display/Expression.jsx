import PropTypes from "prop-types";
import React from "react";

const Expression = ({ value, className = "" }) => {
	const displayValue = value || "";

	return (
		<div
			className={`text-gray-300 text-right px-4 pt-1 text-medium font-mono overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 ${className}`}
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
