import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import HistoryItem from "./HistoryItem";

const History = React.forwardRef(
	({ items = [], onSelect, onClear, selectedId, className = "" }, ref) => {
		const containerRef = useRef(null);
		const wasScrolledToBottom = useRef(true);

		// Combinar la referencia externa con la interna
		const setRefs = (element) => {
			// Guardar la referencia local
			containerRef.current = element;

			// Si hay una referencia externa, actualizarla también
			if (typeof ref === "function") {
				ref(element);
			} else if (ref) {
				ref.current = element;
			}
		};

		// Efecto para manejar el scroll automático
		useEffect(() => {
			if (containerRef.current && wasScrolledToBottom.current) {
				const { scrollHeight } = containerRef.current;
				containerRef.current.scrollTop = scrollHeight;
			}
		}, [items]);

		const handleScroll = (e) => {
			const { scrollTop, scrollHeight, clientHeight } = e.target;
			wasScrolledToBottom.current =
				scrollHeight - (scrollTop + clientHeight) < 50;
		};

		return (
			<div
				className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 h-full ${className}`}
			>
				<div
					ref={setRefs}
					className="divide-y divide-gray-700 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
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

// Asegurarse de que el componente tenga un displayName para las herramientas de desarrollo
History.displayName = "History";

export default React.memo(History);
