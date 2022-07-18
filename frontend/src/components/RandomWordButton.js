import axios from 'axios';
import React, { useEffect } from 'react';

const baseURL = 'http://localhost:5000/randwords';
// const baseURL = 'http://127.0.0.1:5000/randwords';
function RandomWordButton({ image, setWord }) {
  async function onClick() {
    const response = await axios.get(baseURL);
    setWord(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    onClick();
    console.log('useEffect() here');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button onClick={onClick}>
      <img src={image} alt="" className="w-6.25 h-6.553" />
    </button>
  );
}

export default RandomWordButton;
