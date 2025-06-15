import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	appendNumber,
	calculate,
	clear,
	setOperator,
} from "../store/calculatorSlice";

const useKeyboardInput = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const handleKeyDown = (e) => {
			// Prevent default for all keys we handle
			if (e.key.match(/[0-9+\-*/.=]|Enter|Escape|Backspace/)) {
				e.preventDefault();
			}

			// Handle number keys (0-9)
			if (e.key.match(/^[0-9]$/)) {
				dispatch(appendNumber(e.key));
			}
			// Handle operators
			else if (e.key === "+") {
				dispatch(setOperator("+"));
			} else if (e.key === "-") {
				dispatch(setOperator("-"));
			} else if (e.key === "*") {
				dispatch(setOperator("×"));
			} else if (e.key === "/") {
				dispatch(setOperator("÷"));
			}
			// Handle decimal point
			else if (e.key === ".") {
				dispatch(appendNumber("."));
			}
			// Handle equals/enter
			else if (e.key === "=" || e.key === "Enter") {
				dispatch(calculate());
			}
			// Handle clear/escape
			else if (e.key === "Escape" || e.key === "c" || e.key === "C") {
				dispatch(clear());
			}
			// Handle backspace
			else if (e.key === "Backspace") {
				// You can implement backspace functionality here if needed
				// For now, we'll just clear the last character
				// This is a simplified implementation
				// dispatch(backspace());
			}
		};

		// Add event listener
		window.addEventListener("keydown", handleKeyDown);

		// Clean up
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [dispatch]);
};

export default useKeyboardInput;
