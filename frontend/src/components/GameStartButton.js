import React from 'react';
import { Link } from 'react-router-dom';

// 인원수 설정 후 Main페이지에서 랜덤단어생성 페이지로 이동

// const NumURL = 'http://localhost:5000/user-num';
const NumURL = 'http://127.0.0.1:5000/user-num';

function GameStartButton() {
  const [count, setCount] = useState(1);
  const minusClicked = () => {
    if (count > 1) setCount(count - 1);
  };
  const plusClicked = () => {
    if (count < 6) setCount(count + 1);
  };

  // const usernum = document.querySelector(count);

  async function start() {
    // const response = await axios.post(NumURL, count);
    const req = {
      'user-num': count,
    };
    // console.log(response);
    console.log(count);
    fetch(NumURL, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(req),
    }).then(response => console.log(response));
  }

  return (
    <Link to="random">
      <button type="button" className="text-6xl text-primary-1 font-cookierun startshadow textborder">
        start
      </button>
    </Link>
  );
}

export default GameStartButton;
