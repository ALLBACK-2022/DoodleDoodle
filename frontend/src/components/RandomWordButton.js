import axios from 'axios';
import React, { useEffect } from 'react';
// import useAsync from '../useAsync';

// async function getWord() {
//   const response = await axios.get('localhost:5000/randwords');
//   console.log(response);
//   return response.data;
// }
const baseURL = 'http://localhost:5000/randwords';
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

  // const [state, refetch] = useAsync(getWord, []);
  // eslint-disable-next-line no-unused-vars
  // const { loading, data: randword, error } = state;

  // function request() {
  //   refetch();
  //   setWord(randword);
  //   console.log(randword);
  // }
  return (
    <button onClick={onClick}>
      <img src={image} alt="" className="w-6.25 h-6.553" />
    </button>
  );
}

export default RandomWordButton;