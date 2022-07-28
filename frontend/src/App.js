import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Random from './pages/Random';
import Main from './pages/Main';
import GamePage from './pages/GamePage';
// import ResultforOne from './pages/ResultforOne';
import Temp from './pages/Temp'; // API연결 없이 1인용 결과페이지 테스트할때 사용
import ResultMany from './pages/ResultMany';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="random" element={<Random />} />
        <Route path="gamepage" element={<GamePage />} />
        <Route path="resultone" element={<Temp />} />
        <Route path="resultmany" element={<ResultMany />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
