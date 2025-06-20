import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import HistoryItem from "./HistoryItem";

const History = React.forwardRef(
	({ items = [], onSelect, onClear, selectedId, className = "" }, ref) => {
		const containerRef = useRef(null);
		const wasScrolledToBottom = useRef(true);

		const setRefs = (element) => {
			containerRef.current = element;
			if (typeof ref === "function") ref(element);
			else if (ref) ref.current = element;
		};

		const prevItemsLengthRef = useRef(items.length);

		// Auto-Scroll if new items are added
		useEffect(() => {
			if (containerRef.current) {
				if (items.length > prevItemsLengthRef.current) {
					const { scrollHeight } = containerRef.current;
					containerRef.current.scrollTop = scrollHeight;
				}
				prevItemsLengthRef.current = items.length;
			}
		}, [items.length]);

		const handleScroll = (e) => {
			const { scrollTop, scrollHeight, clientHeight } = e.target;
			wasScrolledToBottom.current =
				scrollHeight - (scrollTop + clientHeight) < 50;
		};

		return (
			<div
				className="border border-gray-600 rounded-lg mb-2 min-h-[53px] max-h-[161px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
				ref={setRefs}
				onScroll={handleScroll}
			>
				{items.length > 0 ? (
					items.map((item) => (
						<HistoryItem
							key={item.id}
							expression={item.expression}
							result={item.result}
							onClick={() => onSelect(item)}
							isActive={selectedId === item.id}
						/>
					))
				) : (
					<div className="p-4 text-center text-gray-400">No history yet</div>
				)}
			</div>
		);
	},
);

History.propTypes = {
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			expression: PropTypes.string.isRequired,
			result: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			timestamp: PropTypes.string,
		}),
	),
	onSelect: PropTypes.func.isRequired,
	onClear: PropTypes.func,
	selectedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	className: PropTypes.string,
};

History.displayName = "History";

export default React.memo(History);
