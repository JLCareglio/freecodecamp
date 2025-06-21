import { useCallback, useEffect, useState } from "react";
import DrumPad from "./components/DrumPad";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
	const [displayText, setDisplayText] = useState<string>(
		"Press a key or click a pad",
	);

	const drumPadData = [
		{
			id: "Heater-1",
			keyTrigger: "Q",
			audioSrc: "./assets/audio/Heater-1.mp3",
			displayText: "Heater 1",
		},
		{
			id: "Heater-2",
			keyTrigger: "W",
			audioSrc: "./assets/audio/Heater-2.mp3",
			displayText: "Heater 2",
		},
		{
			id: "Heater-3",
			keyTrigger: "E",
			audioSrc: "./assets/audio/Heater-3.mp3",
			displayText: "Heater 3",
		},
		{
			id: "Heater-4",
			keyTrigger: "A",
			audioSrc: "./assets/audio/Heater-4.mp3",
			displayText: "Heater 4",
		},
		{
			id: "Clap",
			keyTrigger: "S",
			audioSrc: "./assets/audio/Clap.mp3",
			displayText: "Clap",
		},
		{
			id: "Open-HH",
			keyTrigger: "D",
			audioSrc: "./assets/audio/Open-HH.mp3",
			displayText: "Open HH",
		},
		{
			id: "Kick-n-Hat",
			keyTrigger: "Z",
			audioSrc: "./assets/audio/Kick-n-Hat.mp3",
			displayText: "Kick n' Hat",
		},
		{
			id: "Kick",
			keyTrigger: "X",
			audioSrc: "./assets/audio/Kick.mp3",
			displayText: "Kick",
		},
		{
			id: "Closed-HH",
			keyTrigger: "C",
			audioSrc: "./assets/audio/Closed-HH.mp3",
			displayText: "Closed HH",
		},
	];

	const orderedKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
	const orderedDrumPadData = orderedKeys
		.map((key) => drumPadData.find((pad) => pad.keyTrigger === key))
		.filter((pad) => pad !== undefined) as typeof drumPadData;

	const handlePadClick = useCallback((text: string, key: string) => {
		setDisplayText(text);
		const audioElement = document.getElementById(key) as HTMLAudioElement;

		if (!audioElement) {
			console.error(`Audio element with id "${key}" not found`);
			return;
		}

		try {
			audioElement.currentTime = 0;
			const playPromise = audioElement.play();

			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.error(`Error playing audio for key ${key}:`, error);
				});
			}
		} catch (error) {
			console.error(`Unexpected error playing audio for key ${key}:`, error);
		}
	}, []);

	useEffect(() => {
		console.log(
			"Available audio elements:",
			Array.from(document.querySelectorAll("audio")).map((el) => ({
				id: el.id,
				src: el.src,
				readyState: el.readyState,
			})),
		);
	}, []);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const key = event.key.toUpperCase();
			const padData = drumPadData.find((pad) => pad.keyTrigger === key);
			if (padData) {
				handlePadClick(padData.displayText, padData.keyTrigger);
				const padElement = document.getElementById(padData.id);
				if (padElement) {
					padElement.click();
				}
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, [handlePadClick]);

	return (
		<div
			id="drum-machine"
			className="min-h-screen bg-slate-900 flex flex-col p-4 font-sans"
		>
			<Header />
			<main className="flex-grow flex flex-col items-center justify-center">
				<output
					id="display"
					className="bg-slate-700 text-green-300 p-4 mb-8 rounded-lg shadow-xl min-w-[280px] min-h-[60px] text-center text-xl font-mono tracking-wider flex items-center justify-center"
					aria-live="polite"
				>
					{displayText}
				</output>
				<div className="grid grid-cols-3 gap-4">
					{orderedDrumPadData.map((pad) => (
						<DrumPad
							key={pad.id}
							id={pad.id}
							keyTrigger={pad.keyTrigger}
							audioSrc={pad.audioSrc}
							displayText={pad.displayText}
							onClick={handlePadClick}
						/>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}
export default App;
