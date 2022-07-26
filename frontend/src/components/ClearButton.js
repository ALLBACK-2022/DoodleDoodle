import React from 'react';

import trashImg from '../assets/icons/trashImg.png';

function ClearButton({ clearButtonClick }) {
  return (
    <button onClick={clearButtonClick}>
      <img
        src={trashImg}
        alt=""
        className="absolute
        deskTop:h-[6vmin] deskTop:right-[20%] deskTop:top-[5.5%]
        mobile:h-[8.5vmin] mobile:left-[8%] mobile:top-[8%]"
      />
    </button>
  );
}

export default ClearButton;
