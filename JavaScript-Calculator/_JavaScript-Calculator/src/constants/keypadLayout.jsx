import React from "react";

export const BUTTON_TYPES = {
	NUMBER: "number",
	OPERATOR: "operator",
	EQUALS: "equals",
	DECIMAL: "decimal",
	CLEAR: "clear",
	ALL_CLEAR: "allClear",
	BACKSPACE: "backspace",
};

const BackspaceIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="size-6"
		aria-label="Backspace"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
		/>
	</svg>
);

export const keypadLayout = [
	[
		{ id: "clear", label: "AC", type: BUTTON_TYPES.ALL_CLEAR },
		{
			id: "parentheses",
			label: "( )",
			type: BUTTON_TYPES.OPERATOR,
			value: "()",
		},
		{ id: "percent", label: "%", type: BUTTON_TYPES.OPERATOR, value: "%" },
		{ id: "divide", label: "÷", type: BUTTON_TYPES.OPERATOR, value: "÷" },
	],
	[
		{ id: "seven", label: "7", type: BUTTON_TYPES.NUMBER, value: "7" },
		{ id: "eight", label: "8", type: BUTTON_TYPES.NUMBER, value: "8" },
		{ id: "nine", label: "9", type: BUTTON_TYPES.NUMBER, value: "9" },
		{ id: "multiply", label: "×", type: BUTTON_TYPES.OPERATOR, value: "×" },
	],
	[
		{ id: "four", label: "4", type: BUTTON_TYPES.NUMBER, value: "4" },
		{ id: "five", label: "5", type: BUTTON_TYPES.NUMBER, value: "5" },
		{ id: "six", label: "6", type: BUTTON_TYPES.NUMBER, value: "6" },
		{ id: "subtract", label: "-", type: BUTTON_TYPES.OPERATOR, value: "-" },
	],
	[
		{ id: "one", label: "1", type: BUTTON_TYPES.NUMBER, value: "1" },
		{ id: "two", label: "2", type: BUTTON_TYPES.NUMBER, value: "2" },
		{ id: "three", label: "3", type: BUTTON_TYPES.NUMBER, value: "3" },
		{ id: "add", label: "+", type: BUTTON_TYPES.OPERATOR, value: "+" },
	],
	[
		{ id: "zero", label: "0", type: BUTTON_TYPES.NUMBER, value: "0" },
		{ id: "decimal", label: ".", type: BUTTON_TYPES.DECIMAL, value: "." },
		{ id: "backspace", label: <BackspaceIcon />, type: BUTTON_TYPES.BACKSPACE },
		{ id: "equals", label: "=", type: BUTTON_TYPES.EQUALS },
	],
];

// Create a map of button IDs to their configurations for quick lookup
export const buttonConfigs = keypadLayout
	.flat()
	.filter((btn) => btn.id) // Remove empty slots from row spans
	.reduce((acc, btn) => {
		acc[btn.id] = btn;
		return acc;
	}, {});
