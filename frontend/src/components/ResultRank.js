// import React, { useState } from 'react';
import sketchbook from '../assets/icons/sketchbook.png';

function ResultRank() {
  // 여기서 GET API 불러오기(각 데이터 넣어주기)
  //   const chartData = [{percentage, rank, doodle, player }]

  return (
    <div className="flex ">
      <div className="flex flex-col m-[2rem]">
        <div className="absolute flex flex-row space-x-10">
          <div className="font-cookierun text-5xl text-black ml-3 mr-[4rem] "> 1st </div>
          <div className="font-cookierun text-3xl text-black "> player2 </div>
          <div className="font-cookierun text-3xl text-white "> 90% </div>
        </div>
        <div>
          <img id="sketchbook" src={sketchbook} className=" mt-5  h-[18rem] relative " alt="" />
        </div>
      </div>
    </div>
  );
}

export default ResultRank;
