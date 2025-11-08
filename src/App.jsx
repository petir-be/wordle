import { useEffect, useState } from "react";
import Line from "./components/Line";


function App() {
  const [keypressed, setKeyPressed] = useState('');
   

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
    </div>
    </>
  )
}

export default App
