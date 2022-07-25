import React from 'react';
import MainText from '../components/MainText';
import AboutIcon from '../assets/icons/aboutIcon.png';
import MainIcon from '../assets/icons/mainIcon.png';
import GameStartButton from '../components/GameStartButton';

/*
 *   '두들 두들!' 시작 페이지
 */

function Main() {
  return (
    <div className="flex w-screen h-screen relative bg-primary">
      <button className="absolute left-[1rem] top-[1rem] w-[3rem]">
        <img src={AboutIcon} alt="" />
      </button>
      <div className="flex flex-col w-[40%] h-auto ml-[5%] justify-center">
        <MainText text=" 두들, 두들! " />
        <h2 className="ml-[15%] text-[3.5vw] text-primary-1 font-cookierun doddleshadow textborder  text-right">
          Doodle, Doodle
        </h2>
        <GameStartButton />
        {/* // history 부분 설정해서 뒤로 가도 숫자는 그대로인걸 구현해보기  */}
      </div>
      <div className="flex flex-col mr-[5%] justify-center">
        <img className="max-h-[100vh] absolute right-[0] w-[45%]" src={MainIcon} alt="" />
      </div>
    </div>
  );
}

export default Main;
