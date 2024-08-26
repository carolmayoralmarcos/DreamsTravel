import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Router from './routes/Router';
import { TravelsProvider } from './context/TravelsContext';

function App() {
  return (
    <TravelsProvider>
      <div className="App">
        <Router />
      </div>
    </TravelsProvider>
  );
}

export default App;

