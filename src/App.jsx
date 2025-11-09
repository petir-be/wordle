import { useEffect, useState, useRef } from "react";
import Line from "./components/Line";

const API_URL = 'api/api/fe/wordle-words';

function App() {
  const [keypressed, setKeyPressed] = useState('');
  const [word, setWord] = useState(null);
  const fetchedRef = useRef(false);
   
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
        {keypressed}
        {word}
    </div>
    </>
  )
}

export default App
