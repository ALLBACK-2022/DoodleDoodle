import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Random from './pages/Random';
import Main from './pages/Main';
import GamePage from './pages/GamePage';
import ResultforOne from './pages/ResultforOne';
import ResultMany from './pages/ResultMany';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="random" element={<Random />} />
        <Route path="gamepage" element={<GamePage />} />
        <Route path="resultone" element={<ResultforOne />} />
        <Route path="resultmany" element={<ResultMany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
