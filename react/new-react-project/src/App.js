import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import './App.css';

function App() {
  const { width, height } = useWindowSize();
  return (
    <div className="App">
      <Confetti 
      width={width} 
      height={height}
      numberOfPieces='400'
      wind='2'
      friction='1'
      />
      <h1>Wow, I'm working with React on my machine!</h1>
      <p>Is this what happiness feels like?</p>
    </div>
  );
}

export default App;
