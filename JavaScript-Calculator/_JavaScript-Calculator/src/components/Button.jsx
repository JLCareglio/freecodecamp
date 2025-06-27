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
			"bg-slate-700 hover:bg-slate-600 text-slate-100 active:bg-slate-800 transition-all duration-150 ease-in-out transform active:scale-95 border border-slate-600/50",
		operator:
			"bg-cyan-700 hover:bg-cyan-600 text-white font-medium active:bg-cyan-800 transition-all duration-150 ease-in-out transform active:scale-95 border border-cyan-600/50",
		equals:
			"bg-zinc-500 hover:bg-zinc-400 text-white font-medium active:bg-zinc-600 transition-all duration-150 ease-in-out transform active:scale-95 border border-zinc-400/50",
		decimal:
			"bg-slate-700 hover:bg-slate-600 text-slate-100 active:bg-slate-800 transition-all duration-150 ease-in-out transform active:scale-95 border border-slate-600/50",
		clear:
			"bg-blue-800 hover:bg-blue-700 text-white font-medium active:bg-blue-900 transition-all duration-150 ease-in-out transform active:scale-95 border border-blue-700/50",
		allClear:
			"bg-blue-800 hover:bg-blue-700 text-white font-medium active:bg-blue-900 transition-all duration-150 ease-in-out transform active:scale-95 border border-blue-700/50",
		backspace:
			"bg-blue-800 hover:bg-blue-700 text-white font-medium active:bg-blue-900 transition-all duration-150 ease-in-out transform active:scale-95 border border-blue-700/50",
		default:
			"bg-slate-800 hover:bg-slate-700 text-slate-200 active:bg-slate-900 transition-all duration-150 ease-in-out transform active:scale-95 border border-slate-700/50",
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
		if (!disabled && onClick) onClick(e);
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

	if (spanStyles.length > 0)
		return <div className={spanStyles.join(" ")}>{button}</div>;

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
