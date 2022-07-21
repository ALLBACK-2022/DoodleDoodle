import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
// import useAsync from '../useAsync';

// async function getWord() {
//   const response = await axios.get('localhost:5000/randwords');
//   console.log(response);
//   return response.data;
// }

const baseURL = 'http://localhost:5000/randwords';
// const baseURL = 'http://127.0.0.1:5000/randwords';
function StartDrawButton({ image, word }) {
  const location = useLocation();
  async function onClick() {
    const response = await axios.post(baseURL, word);
    console.log(response);
  }

  return (
    <Link
      to="/"
      state={{
        drawWord: word,
        playerNum: location.state.playerNum,
        gameID: location.state.gameID,
      }}
    >
      <button onClick={onClick}>
        <img src={image} alt="" className="w-6.25 h-6.553" />
      </button>
    </Link>
  );
}

export default StartDrawButton;
