import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	appendNumber,
	backspace,
	calculate,
	clear,
	setOperator,
} from "../store/calculatorSlice";
import { addToHistory } from "../store/historySlice";

const useKeyboardInput = (expression, currentResult) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const numberKeys = /^[0-9]$|^Numpad[0-9]$/;
		const operatorMap = {
			"+": "+",
			NumpadAdd: "+",
			"-": "-",
			NumpadSubtract: "-",
			"*": "×",
			NumpadMultiply: "×",
			"/": "÷",
			NumpadDivide: "÷",
			"%": "%",
		};

		const handleKeyDown = (e) => {
			if (
				e.key.match(/[0-9+\-*/.=]|Enter|Escape|Backspace|Delete|%|,|Numpad/)
			) {
				e.preventDefault();
			}

			// Handle numbers
			if (numberKeys.test(e.key)) {
				const number = e.key.replace("Numpad", "");
				dispatch(appendNumber(number));
				return;
			}

			// Handle operators
			if (operatorMap[e.key]) {
				dispatch(setOperator(operatorMap[e.key]));
				return;
			}

			// Handle other cases
			switch (e.key) {
				case ".":
				case ",":
				case "NumpadDecimal":
					dispatch(appendNumber("."));
					break;
				case "=":
				case "Enter":
				case "NumpadEnter":
					dispatch(calculate());
					setTimeout(() => {
						dispatch(
							addToHistory({
								expression,
								result: currentResult,
							}),
						);
					}, 0);
					break;
				case "Escape":
				case "c":
				case "C":
				case "Delete":
					dispatch(clear());
					break;
				case "Backspace":
					dispatch(backspace());
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dispatch, expression, currentResult]);
};

export default useKeyboardInput;
