import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Display from "./components/Display/Display";
import History from "./components/History/History";
import Keypad from "./components/Keypad/Keypad";
import { BUTTON_TYPES } from "./constants/keypadLayout.jsx";
import useKeyboardInput from "./hooks/useKeyboardInput";
import {
	appendNumber,
	calculate,
	clear,
	loadFromHistory,
	selectCurrentResult,
	selectCurrentValue,
	selectExpression,
	selectLastInput,
	selectLastResult,
	setOperator,
} from "./store/calculatorSlice";
import {
	addToHistory,
	clearHistory,
	selectHistory,
} from "./store/historySlice";
import "./index.css";

function App() {
	// Get state from Redux
	const expression = useSelector(selectExpression);
	const currentValue = useSelector(selectCurrentValue);
	const lastInput = useSelector(selectLastInput);
	const lastResult = useSelector(selectLastResult);
	const currentResult = useSelector(selectCurrentResult);
	const history = useSelector(selectHistory);

	const dispatch = useDispatch();
	const [showHistory, setShowHistory] = useState(false);
	const [selectedHistoryId, setSelectedHistoryId] = useState(null);
	const historyContainerRef = useRef(null);

	// Enable keyboard input
	useKeyboardInput();

	// Auto-hide history when it's empty and not being toggled by the user
	useEffect(() => {
		// Only auto-hide if the history becomes empty while the panel is open
		const timer = setTimeout(() => {
			if (history.length === 0 && showHistory) {
				setShowHistory(false);
			}
		}, 0);

		return () => clearTimeout(timer);
	}, [history.length, showHistory]);

	// Handle number button click
	const handleNumberClick = (number) => {
		dispatch(appendNumber(number));
	};

	// Handle operator button click
	const handleOperatorClick = (operator) => {
		dispatch(setOperator(operator));
	};

	// Handle decimal button click
	const handleDecimalClick = () => {
		dispatch(appendNumber("."));
	};

	// Handle equals button click
	const handleEqualsClick = () => {
		dispatch(calculate());
		// Get the current expression before dispatching
		const currentExpr = expression;

		// Add to history after a small delay to ensure state is updated
		setTimeout(() => {
			dispatch(
				addToHistory({
					expression: currentExpr,
					result: currentResult,
				}),
			);
		}, 0);
	};

	// Handle clear button click
	const handleClearClick = () => {
		dispatch(clear());
	};

	// Handle all clear button click
	const handleAllClearClick = () => {
		dispatch(clear());
	};

	// Handle history item selection
	const handleHistorySelect = (item) => {
		dispatch(loadFromHistory(item));
		setSelectedHistoryId(item.id);
		setShowHistory(false);
	};

	// Handle history clear
	const handleHistoryClear = () => {
		dispatch(clearHistory());
		setSelectedHistoryId(null);
	};

	// Toggle history panel
	const toggleHistory = () => {
		setShowHistory(!showHistory);
	};

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
			<div className="w-full max-w-[336px] flex flex-col">
				<div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col border border-gray-700">
					{/* Header */}
					<div className="p-4 bg-gradient-to-r from-blue-800/90 to-blue-700/90 text-blue-100">
						<div className="flex justify-between items-center">
							<h1 className="text-xl font-bold">JS-Calculator</h1>
							<div className="flex items-center space-x-2">
								{showHistory && (
									<button
										onClick={handleHistoryClear}
										className="p-2 rounded-full hover:bg-rose-800/80 transition-colors text-rose-100 hover:text-white"
										aria-label="Clear history"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</button>
								)}
								<button
									onClick={toggleHistory}
									className={`p-2 rounded-full transition-colors text-emerald-100 ${showHistory ? "bg-emerald-700/80 hover:bg-emerald-600/80" : "hover:bg-emerald-700/50 hover:text-white"}`}
									aria-label={showHistory ? "Hide history" : "Show history"}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="size-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					<div
						className="p-4 flex flex-col bg-gray-800"
						style={{ height: "calc(100% - 64px)" }}
					>
						{/* History Panel */}
						{showHistory && (
							<div
								className="mb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
								style={{ flex: "1 1 auto", minHeight: "0", overflowY: "auto" }}
							>
								<History
									ref={historyContainerRef}
									items={history}
									onSelect={handleHistorySelect}
									onClear={handleHistoryClear}
									selectedId={selectedHistoryId}
								/>
							</div>
						)}

						{/* Display */}
						<Display
							expression={expression}
							currentValue={currentValue}
							currentResult={currentResult}
							lastInput={lastInput}
							className="mb-4"
						/>

						{/* Keypad */}
						<div className="w-full" style={{ height: "368px", flexShrink: 0 }}>
							<Keypad
								onNumberClick={handleNumberClick}
								onOperatorClick={handleOperatorClick}
								onDecimalClick={handleDecimalClick}
								onEqualsClick={handleEqualsClick}
								onClearClick={handleClearClick}
								onAllClearClick={handleAllClearClick}
								className="w-full h-full"
							/>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-4 text-center text-sm text-gray-500">
					<p>Dev: Jesús Lautaro Careglio Albornoz</p>
				</div>
			</div>
		</div>
	);
}

export default App;
