import PropTypes from "prop-types";
import React from "react";

const HistoryItem = ({ expression, result, onClick, isActive }) => {
	return (
		<div
			className={`p-3 border-b border-gray-700 
			transition-all duration-200 ease-in-out
			${isActive ? "bg-blue-900/30 border-l-4 border-l-blue-500" : "hover:bg-gray-700/50"}
			cursor-pointer
		`}
			onClick={onClick}
			aria-label={`Previous calculation: ${expression} = ${result}`}
		>
			<div className="text-gray-300 text-right text-sm font-mono">
				{expression}
			</div>
			<div className="text-right font-medium text-blue-300">= {result}</div>
		</div>
	);
};

HistoryItem.propTypes = {
	expression: PropTypes.string.isRequired,
	result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};

export default HistoryItem;
