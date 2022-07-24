import React from 'react';

function PlayerText({ currentPlayer, maxPlayer }) {
  return (
    <div
      className="font-cookierun absolute h-[6vmin]
      deskTop:left-[5.5%] deskTop:top-[5.5%]
      deskTop:text-[4vmin] deskTop:text-primary-3
      mobile:left-[50%] mobile:translate-x-[-50%] mobile:top-[11%] 
      mobile:text-[5vmin] mobile:text-primary-1
      flex items-center"
    >
      {maxPlayer === 1 ? '' : ''.concat('플레이어 ', currentPlayer, '/', maxPlayer)}
    </div>
  );
}

export default PlayerText;
