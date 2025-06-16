import PropTypes from "prop-types";
import React from "react";

const Button = ({
	id,
	label,
	onClick,
	type = "default",
	disabled = false,
	colSpan = 1,
	rowSpan = 1,
	className = "",
}) => {
	const baseStyles =
		"flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";

	const typeStyles = {
		number:
			"bg-gray-700 hover:bg-gray-600 text-gray-100 active:bg-gray-500 transition-all duration-150 ease-in-out transform active:scale-95",
		operator:
			"bg-amber-700 hover:bg-amber-600 text-white active:bg-amber-800 transition-all duration-150 ease-in-out transform active:scale-95",
		equals:
			"bg-green-700 hover:bg-green-600 text-white active:bg-green-800 transition-all duration-150 ease-in-out transform active:scale-95",
		decimal:
			"bg-gray-700 hover:bg-gray-600 text-gray-100 active:bg-gray-500 transition-all duration-150 ease-in-out transform active:scale-95",
		clear:
			"bg-rose-900/80 hover:bg-rose-800/80 text-rose-100 active:bg-rose-900/90 transition-all duration-150 ease-in-out transform active:scale-95",
		allClear:
			"bg-rose-900/80 hover:bg-rose-800/80 text-rose-100 active:bg-rose-900/90 transition-all duration-150 ease-in-out transform active:scale-95",
		backspace:
			"bg-rose-900/80 hover:bg-rose-800/80 text-rose-100 active:bg-rose-900/90 transition-all duration-150 ease-in-out transform active:scale-95",
		default:
			"bg-gray-800 hover:bg-gray-700 text-gray-200 active:bg-gray-600 transition-all duration-150 ease-in-out transform active:scale-95",
	};

	const spanStyles = [];
	if (colSpan > 1) spanStyles.push(`col-span-${colSpan}`);
	if (rowSpan > 1) spanStyles.push(`row-span-${rowSpan}`);

	const buttonClasses = [
		baseStyles,
		typeStyles[type] || typeStyles.default,
		"h-14 rounded-lg m-1",
		disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
		className,
	].join(" ");

	const handleClick = (e) => {
		if (!disabled && onClick) {
			onClick(e);
		}
	};

	const button = (
		<button
			type="button"
			id={id}
			className={buttonClasses}
			onClick={handleClick}
			disabled={disabled}
			aria-label={label}
		>
			{label}
		</button>
	);

	if (spanStyles.length > 0) {
		return <div className={spanStyles.join(" ")}>{button}</div>;
	}

	return button;
};

Button.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
	onClick: PropTypes.func,
	type: PropTypes.oneOf([
		"number",
		"operator",
		"equals",
		"decimal",
		"clear",
		"default",
	]),
	disabled: PropTypes.bool,
	colSpan: PropTypes.number,
	rowSpan: PropTypes.number,
	className: PropTypes.string,
};

export default Button;
