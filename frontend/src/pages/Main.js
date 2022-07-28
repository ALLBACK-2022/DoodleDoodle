import React from 'react';
import { useMediaQuery } from 'react-responsive';
import MainText from '../components/MainText';
import AboutIcon from '../assets/icons/aboutIcon.png';
import MainIcon from '../assets/icons/mainIcon.png';
import GameStartButton from '../components/GameStartButton';
import DoodleBelt from '../components/DoodleBelt';

/*
 *   '두들 두들!' 시작 페이지
 */

function Main() {
  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width: 701px)',
  });
  return (
    <div className="flex w-screen h-screen relative bg-primary">
      {isMobile && (
        <div className="w-[100%]">
          <DoodleBelt isTop />
        </div>
      )}
      {isPc && (
        <button className="absolute m-[2rem] w-[3rem]">
          <img src={AboutIcon} alt="" />
        </button>
      )}
      <div
        className="absolute flex flex-col justify-center top-[50%] translate-y-[-50%]
        deskTop:w-[40%] deskTop:left-[5%]
        mobile:left-[50%] mobile:translate-x-[-50%] mb mobile:w-[80%]"
      >
        <MainText text=" 두들, 두들! " />
        <h2
          className="ml-[15%] text-primary-1 font-cookierun doddleshadow textborder text-right
        deskTop:text-[3.5vw] mobile:text-[6vw]"
        >
          Doodle, Doodle
        </h2>
        <GameStartButton />
        {/* // history 부분 설정해서 뒤로 가도 숫자는 그대로인걸 구현해보기  */}
      </div>
      {isPc && (
        <div
          className="absolute flex flex-col right-[5%] w-[45%]
        deskTop:top-[50%] deskTop:translate-y-[-50%]"
        >
          <img className="max-h-[100vh]" src={MainIcon} alt="" />
        </div>
      )}
      {isMobile && (
        <div className="w-[100%] bottom-0 absolute">
          <DoodleBelt isTop={false} />
        </div>
      )}
    </div>
  );
}

export default Main;
