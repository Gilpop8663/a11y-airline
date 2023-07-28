import React from 'react';
import './App.css';
import SpinButton from './components/SpinButton';

function App() {
  return (
    <div className="App">
      <div className="spin-container">
        <h1>승객 선택</h1>
        <SpinButton kind="adult" />
        <SpinButton kind="infant" />
        <SpinButton kind="baby" />
      </div>
    </div>
  );
}

export default App;
