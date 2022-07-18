import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Random from './pages/Random';
import Main from './pages/Main';
// import GamePage from './pages/GamePage';
import ResultforOne from './pages/ResultforOne';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="random" element={<Random />} />
        {/* <Route path="gamepage" element={<GamePage />} /> */}
        <Route path="resultone" element={<ResultforOne />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
