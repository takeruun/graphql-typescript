import React, { useState } from 'react';
import './App.css';

function App() {
  const handleGetUsers = () => {
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Sample Open API schema APP Go, TypeScript </p>
      </header>
      <div className="container">
        <div className='buttons'>
          <div>
            <button>Hello</button>
          </div>
          <div>
            <button onClick={handleGetUsers}>GetUsers</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
