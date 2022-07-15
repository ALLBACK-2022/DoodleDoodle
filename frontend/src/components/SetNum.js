import React, { useState } from 'react';
import Minus from '../assets/icons/minus.png';
import Plus from '../assets/icons/plus.png';

// NumIcon 은 Main 페이지에서 인원수를 설정할 때 사용하는 코드로 Main.js에서 사용

function SetNum() {
  const [count, setCount] = useState(0);
  const minusClicked = () => {
    if (count > 0) setCount(count - 1);
  };
  const plusClicked = () => {
    if (count < 6) setCount(count + 1);
  };

  return (
    <div className="flex-auto flex flex-row space-x-10">
      <button className="w-4.375 h-4.375 rounded-full " onClick={minusClicked}>
        <img src={Minus} alt="" className="w-[4rem] h-[4rem]" />
      </button>
      <div className="flex space-x-4 text-6xl text-primary-1 font-cookierun startshadow textborder">
        <p>{count}</p>
      </div>
      <button className=" rounded-full" onClick={plusClicked}>
        <img src={Plus} alt="" className="w-[4rem] h-[4rem]" />
      </button>
    </div>
  );
}
export default SetNum;
