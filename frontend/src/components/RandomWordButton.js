import axios from 'axios';
import React, { useEffect } from 'react';

const backBaseUrl = process.env.REACT_APP_BACKEND_URL;
const baseURL = `${backBaseUrl}/api/v1/randwords`;
function RandomWordButton({ image, setWord }) {
  async function onClick() {
    const response = await axios.get(baseURL);
    setWord(response.data);
    // console.log(response.data);
  }
  useEffect(() => {
    onClick();
    // console.log('useEffect() here');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button onClick={onClick}>
      <img src={image} alt="" className="w-6.25 h-6.553" />
    </button>
  );
}

export default RandomWordButton;
