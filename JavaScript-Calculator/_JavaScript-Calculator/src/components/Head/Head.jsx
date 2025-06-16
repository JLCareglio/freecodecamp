import PropTypes from "prop-types";
import React from "react";

const Head = ({ showHistory, hasHistory, onToggleHistory, onClearHistory }) => {
	return (
		<div className="py-1 px-4 bg-gradient-to-r from-blue-800/90 to-blue-700/90 text-blue-100">
			<div className="flex justify-between items-center">
				<h1 className="text-xl font-bold">JS-Calculator</h1>
				<div className="flex items-center space-x-2">
					{showHistory && (
						<button
							type="button"
							onClick={onClearHistory}
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
								role="img"
								aria-label="Clear history"
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
						type="button"
						onClick={onToggleHistory}
						disabled={!hasHistory}
						className={`p-2 rounded-full transition-colors ${
							!hasHistory
								? "text-gray-500 cursor-not-allowed"
								: `text-emerald-100 ${showHistory ? "bg-emerald-700/80 hover:bg-emerald-600/80" : "hover:bg-emerald-700/50 hover:text-white"}`
						}`}
						aria-label={
							hasHistory
								? showHistory
									? "Hide history"
									: "Show history"
								: "No history available"
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
							role="img"
							aria-label={
								hasHistory
									? showHistory
										? "Hide history"
										: "Show history"
									: "No history available"
							}
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
	);
};

Head.propTypes = {
	showHistory: PropTypes.bool.isRequired,
	hasHistory: PropTypes.bool.isRequired,
	onToggleHistory: PropTypes.func.isRequired,
	onClearHistory: PropTypes.func.isRequired,
};

export default Head;
