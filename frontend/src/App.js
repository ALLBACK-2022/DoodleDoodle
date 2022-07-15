import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Random from './pages/Random';
import ResultforOne from './pages/ResultforOne';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Random />} />
        <Route path="random" element={<Random />} />
        <Route path="resultone" element={<ResultforOne />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
