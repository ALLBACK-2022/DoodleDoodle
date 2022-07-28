import React from 'react';

import nextImg from '../assets/icons/nextImg.png';
import checkImg from '../assets/icons/checkImg.png';

function NextButton({ nextButtonClick, isMaxPlayer }) {
  return (
    <button onClick={nextButtonClick}>
      <img
        src={isMaxPlayer ? checkImg : nextImg}
        alt=""
        className="absolute 
        deskTop:h-[6vmin] deskTop:top-[5.5%] deskTop:right-[10%]
        mobile:h-[8.5vmin] mobile:top-[8%] mobile:right-[8%]"
      />
    </button>
  );
}

export default NextButton;
