import { useCallback } from "react";
import type { KeyboardEvent } from "react";

interface DrumPadProps {
	id: string;
	keyTrigger: string;
	audioSrc: string;
	displayText: string;
	onClick: (displayTest: string, audioId: string) => void;
}

const DrumPad: React.FC<DrumPadProps> = ({
	id,
	keyTrigger,
	audioSrc,
	displayText,
	onClick,
}) => {
	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick(displayText, keyTrigger);
			}
		},
		[onClick, displayText, keyTrigger],
	);
	return (
		<button
			id={id}
			type="button"
			className="drum-pad bg-green-700 hover:bg-green-600 text-green-100 font-bold p-6 m-1 rounded-lg shadow-lg cursor-pointer transition-all duration-100 ease-in-out transform active:scale-95 active:bg-green-500 flex items-center justify-center aspect-square text-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
			onClick={() => onClick(displayText, keyTrigger)}
			onKeyDown={handleKeyDown}
			aria-label={`Drum pad for ${displayText}`}
		>
			{keyTrigger}
			<audio id={keyTrigger} className="clip" src={audioSrc}>
				<track kind="captions" />
			</audio>
		</button>
	);
};

export default DrumPad;
