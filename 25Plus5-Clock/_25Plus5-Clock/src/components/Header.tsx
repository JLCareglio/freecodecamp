const Header = () => {
  return (
    <div className="w-full">
      <header className="w-full py-4 flex justify-center relative">
        <a href="https://jlcareglio.github.io/freecodecamp/" className="block">
          <img
            src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
            alt="freeCodeCamp Logo"
            className="h-8 w-auto"
            width="260"
          />
        </a>
      </header>
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#ff6b00] to-transparent shadow-[0_0_8px_#ff6b00,0_0_16px_#ff8c00,0_0_24px_#ffa500] animate-pulse"></div>
    </div>
  );
};

export default Header;
