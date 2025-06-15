import PropTypes from "prop-types";
import React from "react";
import { BUTTON_TYPES, keypadLayout } from "../../constants/keypadLayout.jsx";
import Button from "../Button";

const Keypad = ({
	onNumberClick,
	onOperatorClick,
	onDecimalClick,
	onEqualsClick,
	onClearClick,
	onAllClearClick,
	onBackspaceClick,
	className = "",
}) => {
	const handleButtonClick = (button) => {
		switch (button.type) {
			case BUTTON_TYPES.NUMBER:
				onNumberClick(button.value);
				break;
			case BUTTON_TYPES.OPERATOR:
				onOperatorClick(button.value);
				break;
			case BUTTON_TYPES.DECIMAL:
				onDecimalClick();
				break;
			case BUTTON_TYPES.EQUALS:
				onEqualsClick();
				break;
			case BUTTON_TYPES.CLEAR:
				onClearClick();
				break;
			case BUTTON_TYPES.ALL_CLEAR:
				onAllClearClick();
				break;
			case BUTTON_TYPES.BACKSPACE:
				onBackspaceClick();
				break;
			default:
				break;
		}
	};

	return (
		<div className={`grid grid-cols-4 gap-2 w-full h-full ${className}`}>
			{keypadLayout.map((row, rowIndex) => (
				<React.Fragment key={`row-${rowIndex}`}>
					{row.map((button, colIndex) => (
						<div
							key={button.id}
							className={`
                ${button.colSpan ? `col-span-${button.colSpan}` : ""}
                ${button.rowSpan ? `row-span-${button.rowSpan}` : ""}
              `}
						>
							<Button
								id={button.id}
								label={button.label}
								type={button.type}
								onClick={() => handleButtonClick(button)}
								className="w-full h-full flex items-center justify-center text-xl"
							/>
						</div>
					))}
				</React.Fragment>
			))}
		</div>
	);
};

Keypad.propTypes = {
	onNumberClick: PropTypes.func.isRequired,
	onOperatorClick: PropTypes.func.isRequired,
	onDecimalClick: PropTypes.func.isRequired,
	onEqualsClick: PropTypes.func.isRequired,
	onClearClick: PropTypes.func.isRequired,
	onAllClearClick: PropTypes.func.isRequired,
	onBackspaceClick: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default Keypad;
