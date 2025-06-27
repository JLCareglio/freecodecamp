import PropTypes from "prop-types";
import React from "react";

const HistoryItem = ({ expression, result, onClick, isActive }) => {
	return (
		<button
			type="button"
			className={`w-full text-left px-3 py-2 border-b border-slate-600/30 
			transition-all duration-200 ease-in-out
			${
				isActive
					? "bg-cyan-800/20 border-l-4 border-l-cyan-500 shadow-[inset_0_0_8px_rgba(14,165,233,0.2)]"
					: "hover:bg-slate-700/30"
			}
			cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
		`}
			onClick={onClick}
			aria-label={`Previous calculation: ${expression} = ${result}`}
		>
			<div className="text-slate-300 text-right text-sm font-mono">
				{expression}
			</div>
			<div className="text-right font-medium text-cyan-300">= {result}</div>
		</button>
	);
};

HistoryItem.propTypes = {
	expression: PropTypes.string.isRequired,
	result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onClick: PropTypes.func,
	isActive: PropTypes.bool,
};

export default HistoryItem;
