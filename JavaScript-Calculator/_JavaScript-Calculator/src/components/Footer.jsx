import React from "react";

const Footer = () => {
	return (
		<div className="mt-4 p-4 border border-gray-700 rounded-lg bg-gray-800/50 text-center">
			<div className="space-y-4 text-sm text-gray-300">
				<div className="space-y-2">
					<p className="text-gray-100 font-medium">
						Dev: Jesús Lautaro Careglio Albornoz
					</p>
					<hr className="border-gray-600 my-2" />
				</div>

				<div className="space-y-2">
					<p>
						Built with React, Redux Toolkit, Tailwind CSS, Vite, and Biome
						(alternative to ESLint+Prettier)
					</p>
					<hr className="border-gray-600 my-2" />
				</div>

				<div className="space-y-2">
					<p>
						View source code{" "}
						<a
							href="https://github.com/JLCareglio/freecodecamp/tree/main/JavaScript-Calculator/_JavaScript-Calculator/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
						>
							here
						</a>{" "}
						and check out my other{" "}
						<a
							href="https://jlcareglio.github.io/freecodecamp/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
						>
							freeCodeCamp projects
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
