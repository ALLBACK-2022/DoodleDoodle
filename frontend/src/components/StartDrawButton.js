import axios from 'axios';
import { Link } from 'react-router-dom';
// import useAsync from '../useAsync';

// async function getWord() {
//   const response = await axios.get('localhost:5000/randwords');
//   console.log(response);
//   return response.data;
// }

const baseURL = 'http://localhost:5000/randwords';
function StartDrawButton({ image, word }) {
  async function onClick() {
    const response = await axios.post(baseURL, word);
    console.log(response);
  }

  return (
    <Link to="../gamepage">
      <button onClick={onClick}>
        <img src={image} alt="" className="w-6.25 h-6.553" />
      </button>
    </Link>
  );
}

export default StartDrawButton;
