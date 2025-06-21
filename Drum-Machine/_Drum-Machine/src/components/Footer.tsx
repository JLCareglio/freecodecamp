const Footer = () => {
	return (
		<footer className="mt-8 p-4 text-center text-slate-300 text-sm">
			<div className="space-y-2">
				<p>Dev: Jesús Lautaro Careglio Albornoz.</p>
				<p>Built with React & TailwindCSS4.</p>
				<p>
					View source code{" "}
					<a
						href="https://github.com/JLCareglio/freecodecamp/tree/main/Drum-Machine/_Drum-Machine/"
						className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
					>
						here
					</a>
					<a
						href="https://github.com/JLCareglio/freecodecamp/tree/main/Drum-Machine/_Drum-Machine/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center w-4 h-4 font-bold no-underline leading-none ml-0.5 text-blue-400 hover:text-blue-300 transition-colors duration-300"
					>
						<sup>{"\u2197\uFE0E"}</sup>
					</a>{" "}
					and check out my other{" "}
					<a
						href="https://jlcareglio.github.io/freecodecamp/"
						className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
					>
						freeCodeCamp projects
					</a>
					<a
						href="https://jlcareglio.github.io/freecodecamp/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center w-4 h-4 font-bold no-underline leading-none ml-0.5 text-blue-400 hover:text-blue-300 transition-colors duration-300"
					>
						<sup>{"\u2197\uFE0E"}</sup>
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
