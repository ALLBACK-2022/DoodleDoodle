// import React, { useState } from 'react';
function ResultMulti({ percentage, rank, doodle, player, number }) {
  // 여기서 GET API 불러오기(각 데이터 넣어주기)
  function chagneRank2String(ranknum) {
    switch (ranknum) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      case 4:
      case 5:
      case 6:
        return ''.concat(ranknum, 'th');
      default:
        return '1st';
    }
  }
  const resultConfig = {
    1: 'flex flex-col w-[34rem] h-[30rem]',
    2: 'flex flex-col w-[32rem] h-[28rem]',
    3: 'flex flex-col w-[30rem] h-[26rem]',
    4: 'flex flex-col w-[32rem] h-[28rem]',
    5: 'flex flex-col w-[26rem] h-[22rem]',
    6: 'flex flex-col w-[26rem] h-[22rem]',
  };
  const sketchConfig = {
    1: 'w-[32rem] h-[28rem] items-center',
    2: 'w-[30rem] h-[26rem] items-center',
    3: 'w-[28rem] h-[24rem] items-center',
    4: 'w-[28rem] h-[24rem] items-center',
    5: 'w-[24rem] h-[20rem] items-center',
    6: 'w-[24rem] h-[20rem] items-center',
  };

  return (
    <div className={`${resultConfig[number]}`}>
      <div className="flex flex-row place-content-around">
        <div className="font-cookierun text-4xl text-black"> {chagneRank2String(rank)} </div>
        <div className="font-cookierun text-2xl text-black "> {`player${player}`} </div>
        <div className="font-cookierun text-2xl text-white "> {percentage}% </div>
      </div>
      <div className={`${sketchConfig[number]} self-center text-center relative sketchbook`}>
        <img
          src={doodle}
          alt=""
          className="absolute w-1/2 h-1/2 left-1/2 top-1/2 
          -translate-y-[50%] -translate-x-[50%]"
        />
      </div>
    </div>
  );
}

export default ResultMulti;
