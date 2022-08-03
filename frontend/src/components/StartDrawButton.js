import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:5000/api/randwords';
function StartDrawButton({ image, word }) {
  const location = useLocation(); // 이전 페이지에서 받아온 데이터
  const navigate = useNavigate(); // 페이지 이동 시 사용

  async function onClick() {
    window.sessionStorage.removeItem('gameId');

    const req = {
      id: location.state.gameID,
      name: word,
    };

    await axios.post(baseURL, req).then(
      navigate('../gamepage', {
        replace: true,
        state: { drawWord: word, playerNum: location.state.playerNum, gameID: location.state.gameID },
      }),
    );
  }

  return (
    <button onClick={onClick}>
      <img src={image} alt="" className="w-6.25 h-6.553" />
    </button>
  );
}

export default StartDrawButton;
