import { useEffect, useState, useRef } from "react";

const API_URL = 'api/api/fe/wordle-words';

function App() {
  const [keypressed, setKeyPressed] = useState('');
  const [word, setWord] = useState(null);
  const fetchedRef = useRef(false);
  const guesses = 6;
   
useEffect(() =>{
  if(fetchedRef.current) return;
  fetchedRef.current = true;

  const fetchWord = async () =>{
    try{
      const response = await fetch(API_URL);
      const data = await response.json();
      const randomWord = data[Math.floor(Math.random() * data.length)];
      setWord(randomWord);
    }catch(error){
      console.error("Error fetching the word:", error);
    }
  };
  fetchWord();
}, []);



useEffect(() =>{
  const handleKeyDown = (e) =>{
    
    if(e.key === 'Backspace'){
      setKeyPressed(keypressed.slice(0, -1));
      return;
    }
    if(e.key.length !== 1){
      return;
    }else{
      setKeyPressed(keypressed + e.key);
    }
  }
  
  window.addEventListener('keydown', handleKeyDown);
  
  return() => {
    window.removeEventListener('keydown', handleKeyDown)
  }
}, [keypressed])

  return (
    <>
    <div className="text-6xl underline text-white min-h-dvh flex justify-center items-center">
        {guesses > 0 ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: guesses }).map((_, index) => (
              <Line key={index} word={word} keypressed={keypressed} />
            ))}
          </div>
        ) : (
          <div>Game Over! The word was: {word}</div>
        )}
    </div>
    </>
  )
}
function Line(){
  return <>
    <div className="flex gap-2">
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
    </div>
  </>;
}


function Tile(){
    return <>
    <div className="w-15 h-15 border-2 border-gray-500">

        
    </div>
    </>
}

export default App
