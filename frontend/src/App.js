import './App.css';
// import Random from './pages/Random';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GamePage from './pages/GamePage';
import ResultforOne from './pages/ResultforOne';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="ResultforOne" element={<ResultforOne />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
