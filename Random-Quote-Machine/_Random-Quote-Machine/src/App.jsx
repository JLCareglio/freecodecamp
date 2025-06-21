import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaXTwitter as FaX, FaThreads, FaFacebook } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const ES_QUOTES_API =
  "https://opensheet.vercel.app/1CqMc1KeVl39WRYyrYeszZu1EQVoUB7Lxprroi2iSsc0/Citas";
// const EN_QUOTES_API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
const QUOTES_STORAGE_KEY = "quotes_data";
const QUOTES_LAST_UPDATED_KEY = "quotes_last_updated";

const DARK_THEMES = [
  { primary: "#121212", secondary: "#2d1b3a", tertiary: "#1a1a2e" },
  { primary: "#0f0f1b", secondary: "#2b2b4e", tertiary: "#1a1a35" },
  { primary: "#1a1a2e", secondary: "#16213e", tertiary: "#0f3460" },
  { primary: "#2c3e50", secondary: "#1e3a5f", tertiary: "#0f2439" },
  { primary: "#2d3436", secondary: "#222f3e", tertiary: "#1e272e" },
  { primary: "#232526", secondary: "#414345", tertiary: "#2c3e50" },
  { primary: "#1F1D36", secondary: "#3F3351", tertiary: "#864879" },
  { primary: "#150050", secondary: "#3F0071", tertiary: "#610094" },
  { primary: "#2C3639", secondary: "#3F4E4F", tertiary: "#A27B5C" },
  { primary: "#2D033B", secondary: "#810CA8", tertiary: "#C147E9" },
  { primary: "#1B262C", secondary: "#0F4C75", tertiary: "#3282B8" },
  { primary: "#251B37", secondary: "#372948", tertiary: "#FFCACA" },
];

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [allQuotes, setAllQuotes] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isNewQuote, setIsNewQuote] = useState(false);
  const [usedQuotes, setUsedQuotes] = useState([]);
  const [remainingQuotes, setRemainingQuotes] = useState(0);
  const [isUserQuote, setIsUserQuote] = useState(false);
  const quoteBoxRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    rootRef.current = document.getElementById("root");
    if (rootRef.current) {
      const theme = DARK_THEMES[currentTheme];
      rootRef.current.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.tertiary})`;
      rootRef.current.style.backgroundSize = "400% 400%";
      rootRef.current.style.animation = "gradientBG 15s ease infinite";
    }
  }, []);

  const initializeQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const now = new Date().getTime();
      const lastUpdated = localStorage.getItem(QUOTES_LAST_UPDATED_KEY);
      const storedQuotes = localStorage.getItem(QUOTES_STORAGE_KEY);

      const shouldUpdate =
        !lastUpdated || now - parseInt(lastUpdated) > 86400000;

      if (storedQuotes && !shouldUpdate) {
        const parsedQuotes = JSON.parse(storedQuotes);
        console.log("Citas cargadas desde localStorage:", parsedQuotes);
        setAllQuotes(parsedQuotes);
        setRemainingQuotes(parsedQuotes.length);
        getRandomQuote(parsedQuotes);
      } else {
        console.log("Buscando nuevas citas...");
        await fetchAndStoreQuotes();
      }
    } catch (error) {
      console.error("Error initializing quotes:", error);
      setQuote("An error occurred while loading quotes.");
      setAuthor("System");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAndStoreQuotes = async () => {
    try {
      const response = await fetch(ES_QUOTES_API);
      const quotes = await response.json();

      const storedQuotes = localStorage.getItem(QUOTES_STORAGE_KEY);
      const previousQuotes = storedQuotes ? JSON.parse(storedQuotes) : [];

      const newQuotes = quotes.filter(
        (newQuote) =>
          !previousQuotes.some(
            (oldQuote) =>
              oldQuote.Citas === newQuote.Citas &&
              oldQuote.Autores === newQuote.Autores
          )
      );

      if (newQuotes.length > 0) {
        console.log("¡Se encontraron nuevas citas!", newQuotes);
      } else {
        console.log("No se encontraron citas nuevas.");
      }

      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
      localStorage.setItem(
        QUOTES_LAST_UPDATED_KEY,
        new Date().getTime().toString()
      );

      console.log("Total de citas cargadas:", quotes);
      setAllQuotes(quotes);
      getRandomQuote(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      throw error;
    }
  };

  const getRandomQuote = (quotes) => {
    if (!quotes || quotes.length === 0) {
      setQuote("No quotes available.");
      setAuthor("System");
      setRemainingQuotes(0);
      return;
    }

    if (usedQuotes.length >= quotes.length) {
      setUsedQuotes([]);
      setRemainingQuotes(quotes.length);
      return;
    }

    const availableQuotes = quotes.filter(
      (_, index) => !usedQuotes.includes(index)
    );
    const quotesToUse = availableQuotes.length > 0 ? availableQuotes : quotes;
    const randomIndex = Math.floor(Math.random() * quotesToUse.length);
    const selectedQuote = quotesToUse[randomIndex];
    const originalIndex = quotes.findIndex(
      (q) =>
        q.Citas === selectedQuote.Citas && q.Autores === selectedQuote.Autores
    );

    const newUsedQuotes = [...usedQuotes, originalIndex];
    setUsedQuotes(newUsedQuotes);

    const remaining = quotes.length - newUsedQuotes.length;
    setRemainingQuotes(remaining > 0 ? remaining : 0);

    const isUserQuote = originalIndex >= 84;
    setIsUserQuote(isUserQuote);

    setQuote(selectedQuote.Citas);
    setAuthor(selectedQuote.Autores);
    setIsNewQuote(true);
  };

  const changeTheme = () => {
    const nextTheme = (currentTheme + 1) % DARK_THEMES.length;
    setCurrentTheme(nextTheme);

    if (rootRef.current) {
      const theme = DARK_THEMES[nextTheme];
      rootRef.current.style.background = `linear-gradient(135deg, ${theme.primary}, ${theme.secondary}, ${theme.tertiary})`;
      rootRef.current.style.backgroundSize = "400% 400%";
      rootRef.current.style.animation = "gradientBG 15s ease infinite";
    }
  };

  const handleEditClick = (e) => {
    localStorage.removeItem(QUOTES_STORAGE_KEY);
    localStorage.removeItem(QUOTES_LAST_UPDATED_KEY);
    setRemainingQuotes(0);
  };

  const handleNewQuote = () => {
    changeTheme();
    if (allQuotes.length > 0) getRandomQuote(allQuotes);
    else initializeQuotes();
  };

  useEffect(() => {
    if (isNewQuote) {
      const timer = setTimeout(() => {
        setIsNewQuote(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isNewQuote]);

  useEffect(() => {
    initializeQuotes();
  }, [initializeQuotes]);

  const shareText = `"${quote}" - ${author}`;

  const xQuote = () =>
    // `https://x.com/intent/post?text=${encodeURIComponent(shareText)}`;
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const threadsQuote = () =>
    `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText)}`;

  const facebookQuote = () =>
    `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
      shareText
    )}`;

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <header className="position-absolute top-0 start-50 translate-middle-x mt-3">
          <a href="https://jlcareglio.github.io/freecodecamp/">
            <img
              src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
              alt="freeCodeCamp Logo"
              width="300"
            />
          </a>
        </header>
        {!loading && allQuotes.length > 0 && (
          <div className="quote-counter">
            <span className="badge bg-secondary">
              {remainingQuotes} {remainingQuotes === 1 ? "cita" : "citas"}{" "}
              restante{remainingQuotes !== 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
      <div
        id="quote-box"
        ref={quoteBoxRef}
        className={isNewQuote ? "quote-transition" : ""}
      >
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <>
            <div id="text">
              <p>"{quote}"</p>
            </div>
            <div id="author" className={isUserQuote ? "user-quote" : ""}>
              <p>- {author}</p>
            </div>
            <div className="quote-actions">
              <div className="social-buttons">
                <a
                  id="tweet-quote"
                  className="social-share"
                  href={xQuote()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Compartir en X"
                >
                  <FaX />
                </a>
                <a
                  className="social-share"
                  href={threadsQuote()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Compartir en Threads"
                >
                  <FaThreads />
                </a>
                <a
                  className="social-share"
                  href={facebookQuote()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Compartir en Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  className="social-share edit-button"
                  href="https://docs.google.com/spreadsheets/d/1CqMc1KeVl39WRYyrYeszZu1EQVoUB7Lxprroi2iSsc0/edit?gid=0#gid=0&range=A87"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleEditClick}
                  title="Agregar nueva cita"
                >
                  <FaEdit />
                </a>
              </div>
              <button id="new-quote" className="btn" onClick={handleNewQuote}>
                Nueva Cita
              </button>
            </div>
          </>
        )}
      </div>
      <footer className="footer">
        <div className="container p-0">
          <p className="dev-name">Dev: Jesús Lautaro Careglio Albornoz</p>
          <p>
            Este proyecto fue construido con{" "}
            <span className="fw-semibold">React</span>,{" "}
            <span className="fw-semibold">JavaScript</span> y{" "}
            <span className="fw-semibold">Bootstrap</span> + OpenSheet-API.
            <br />
            Entra{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1CqMc1KeVl39WRYyrYeszZu1EQVoUB7Lxprroi2iSsc0/edit?gid=0#gid=0&range=A87"
              target="_blank"
              rel="noopener noreferrer"
              className="edit-link"
              onClick={handleEditClick}
            >
              aquí
            </a>{" "}
            para agregar/aporta tu cita informática tras 24hs de espera. LEER{" "}
            <a
              href="./DISCLAIMER.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              DISCLAIMER
            </a>
            .
          </p>
          <p className="mb-0">
            Puedes ver el{" "}
            <a href="https://github.com/JLCareglio/freecodecamp/tree/main/Random-Quote-Machine/_Random-Quote-Machine">
              código fuente
            </a>
            <a
              href="https://github.com/JLCareglio/freecodecamp/tree/main/Random-Quote-Machine/_Random-Quote-Machine"
              className="new-tab-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗
            </a>{" "}
            y también ver el resto de mis{" "}
            <a href="https://jlcareglio.github.io/freecodecamp/">
              proyectos de freeCodeCamp
            </a>
            <a
              href="https://jlcareglio.github.io/freecodecamp/"
              className="new-tab-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
