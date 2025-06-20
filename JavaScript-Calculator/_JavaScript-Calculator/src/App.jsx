import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Display from "./components/Display/Display";
import Footer from "./components/Footer";
import Head from "./components/Head/Head";
import History from "./components/History/History";
import Keypad from "./components/Keypad/Keypad";
import useKeyboardInput from "./hooks/useKeyboardInput";
import {
	appendNumber,
	backspace,
	calculate,
	clear,
	loadFromHistory,
	selectCurrentResult,
	selectCurrentValue,
	selectExpression,
	selectLastInput,
	setOperator,
} from "./store/calculatorSlice";
import {
	addToHistory,
	clearHistory,
	selectHistory,
} from "./store/historySlice";

function App() {
	// Get state from Redux
	const expression = useSelector(selectExpression);
	const currentValue = useSelector(selectCurrentValue);
	const lastInput = useSelector(selectLastInput);
	const currentResult = useSelector(selectCurrentResult);
	const history = useSelector(selectHistory);

	const dispatch = useDispatch();
	const [showHistory, setShowHistory] = useState(false);
	const [selectedHistoryId, setSelectedHistoryId] = useState(null);
	const historyContainerRef = useRef(null);

	useKeyboardInput(expression, currentResult);

	// Auto-hide history when it's empty and not being toggled by the user
	useEffect(() => {
		const timer = setTimeout(() => {
			if (history.length === 0 && showHistory) setShowHistory(false);
		}, 0);

		return () => clearTimeout(timer);
	}, [history.length, showHistory]);

	const handleNumberClick = (number) => dispatch(appendNumber(number));
	const handleOperatorClick = (operator) => dispatch(setOperator(operator));
	const handleDecimalClick = () => dispatch(appendNumber("."));

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

	const handleClearClick = () => dispatch(clear());
	const handleAllClearClick = () => dispatch(clear());

	const handleBackspaceClick = () => dispatch(backspace());
	const handleHistorySelect = (item) => {
		dispatch(loadFromHistory(item));
		setSelectedHistoryId(item.id);
		setShowHistory(false);
	};

	const handleHistoryClear = () => {
		dispatch(clearHistory());
		setSelectedHistoryId(null);
	};

	const toggleHistory = () => setShowHistory(!showHistory);

	return (
		<div className="min-h-screen bg-gray-900 flex items-start justify-center p-4 overflow-y-auto">
			<div className="w-full max-w-[336px] flex flex-col min-h-[calc(100vh-2rem)] max-h-none">
				<div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col border border-gray-700 h-full max-h-[calc(100vh-2rem)]">
					{/* Header */}
					<Head
						showHistory={showHistory}
						hasHistory={history.length > 0}
						onToggleHistory={toggleHistory}
						onClearHistory={handleHistoryClear}
					/>

					<div className="p-4 flex flex-col bg-gray-800 flex-1 min-h-0 overflow-y-auto">
						{/* History Panel */}
						{showHistory && (
							<History
								ref={historyContainerRef}
								items={history}
								onSelect={handleHistorySelect}
								onClear={handleHistoryClear}
								selectedId={selectedHistoryId}
							/>
						)}

						{/* Display */}
						<div className="flex-shrink-0">
							<Display
								expression={expression}
								currentValue={currentValue}
								currentResult={currentResult}
								lastInput={lastInput}
							/>
						</div>

						{/* Keypad */}
						<Keypad
							onNumberClick={handleNumberClick}
							onOperatorClick={handleOperatorClick}
							onDecimalClick={handleDecimalClick}
							onEqualsClick={handleEqualsClick}
							onClearClick={handleClearClick}
							onAllClearClick={handleAllClearClick}
							onBackspaceClick={handleBackspaceClick}
						/>
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}

export default App;
