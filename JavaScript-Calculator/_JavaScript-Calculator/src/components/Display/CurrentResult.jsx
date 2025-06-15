import PropTypes from "prop-types";
import React from "react";

const CurrentResult = ({ result, className = "" }) => {
	if (result === null || result === undefined) {
		return <div className={`${className}`} aria-hidden="true"></div>;
	}

	return (
		<div
			className={`text-right px-4 text-blue-300 font-medium ${className}`}
			aria-live="polite"
		>
			= {result}
		</div>
	);
};

CurrentResult.propTypes = {
	result: PropTypes.string,
	className: PropTypes.string,
};

export default CurrentResult;
