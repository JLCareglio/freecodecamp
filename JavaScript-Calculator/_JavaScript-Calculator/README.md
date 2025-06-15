# JavaScript Calculator

A modern, responsive calculator web application built with React, Redux, and Tailwind CSS. This project is part of the FreeCodeCamp Front End Development Libraries certification.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Real-time calculation display
- Calculation history with the ability to recall previous calculations
- Responsive design that works on mobile and desktop
- Keyboard support for all operations
- Clean, modern UI with smooth animations

## Requirements

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/javascript-calculator.git
   cd javascript-calculator
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` or `yarn dev` - Start the development server
- `npm run build` or `yarn build` - Build the app for production
- `npm run preview` or `yarn preview` - Preview the production build
- `npm run lint` or `yarn lint` - Run ESLint
- `npm run format` or `yarn format` - Format code with Prettier

## Technologies Used

- React 18
- Redux Toolkit
- React Redux
- Tailwind CSS
- Vite
- ESLint + Prettier

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Button/        # Button component
│   ├── Display/       # Calculator display components
│   ├── History/       # Calculation history components
│   └── Keypad/        # Calculator keypad component
├── features/          # Feature modules
│   └── math-engine/   # Math evaluation logic
├── hooks/             # Custom React hooks
├── store/             # Redux store configuration
├── utils/             # Utility functions
├── App.jsx            # Root component
└── main.jsx           # Application entry point
```

## Testing

To run the test suite:

```bash
npm test
# or
yarn test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [FreeCodeCamp](https://www.freecodecamp.org/) for the project requirements
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
