import { useEffect, useState, useRef } from "react";

const API_URL = "api/api/fe/wordle-words";

function App() {
  const [keypressed, setKeyPressed] = useState("");
  const [word, setWord] = useState(null);
  const fetchedRef = useRef(false);
  const [guesses, setGuesses] = useState(Array(6).fill(""));

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchWord = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const randomWord = data[Math.floor(Math.random() * data.length)];
        setWord(randomWord);
      } catch (error) {
        console.error("Error fetching the word:", error);
      }
    };
    fetchWord();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        setKeyPressed(keypressed.slice(0, -1));
        return;
      }
      if (e.key.length !== 1) {
        return;
      } else {
        setKeyPressed(keypressed + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keypressed, guesses, word]);

  return (
    <>
      <div className="flex flex-col gap-2 text-3xl">
        {guesses.map((guess, index) => (
          <Line
            key={index}
            guess={
              guess === "" && index === guesses.findIndex((g) => g === "")
                ? keypressed
                : guess
            }
          />
        ))}
        {word}
      </div>
    </>
  );
}

function Line({ guess }) {
  const tiles = [];
  for (let i = 0; i < 5; i++) {
    const char = guess[i] || "";
    tiles.push(<Tile key={i} char={char} />);
  }
  return (
    <>
      <div className="flex gap-2">{tiles}</div>
    </>
  );
}

function Tile({ char }) {
  return (
    <div className="w-14 h-14 border-2 border-gray-600 flex items-center justify-center text-2xl uppercase font-bold">
      {char}
    </div>
  );
}

export default App;
