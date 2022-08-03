import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:5000/api/v1/randwords';
// const baseURL = 'http://localhost:5000/api/randwords';
function StartDrawButton({ image, word }) {
  const location = useLocation(); // 이전 페이지에서 받아온 데이터
  const navigate = useNavigate(); // 페이지 이동 시 사용

  // 여기 수정하면  MobileRandomBtn.js도 수정

  async function onClick() {
    window.sessionStorage.removeItem('gameId');

    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/json; charset=UTF-8',
    };

    const req = {
      id: location.state.gameID,
      name: word,
    };

    await axios.post(baseURL, req, heders).then(response => {
      console.log(response);
      navigate('../gamepage', {
        replace: true,
        state: {
          drawWord: word,
          engDrawWord: response.data.engName,
          playerNum: location.state.playerNum,
          gameID: location.state.gameID,
        },
      });
    });
  }

  return (
    <button onClick={onClick}>
      <img src={image} alt="" className="w-6.25 h-6.553" />
    </button>
  );
}

export default StartDrawButton;
