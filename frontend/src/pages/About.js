// import { useMediaQuery } from 'react-responsive';
import React from 'react';
import { Link } from 'react-router-dom';

import quickdraw from '../assets/icons/quickdraw.png';
import AboutNeeds from '../components/AboutNeeds';
import Profile from '../components/Profile';
import smile from '../assets/icons/smile.png';
import yellowback from '../assets/icons/yellowback.png';

import man1 from '../assets/icons/man1.png';
import man2 from '../assets/icons/man2.png';
import man3 from '../assets/icons/man3.png';
import woman1 from '../assets/icons/woman1.png';
import woman2 from '../assets/icons/woman2.png';
import woman3 from '../assets/icons/woman3.png';
import '../scrollbar.css';

function About() {
  return (
    <div
      className="flex flex-col w-screen h-screen bg-white text-center border-primary 
    border-[1rem]  overflow-y-auto scrollSection p-[1rem] items-center"
    >
      <Link to="/">
        <button>
          <img
            className=" absolute w-[3rem] h-[3rem] deskTop:mt-[2rem] mobile:mt-[1rem] deskTop:ml-[40%] mobile:ml-[35%]"
            src={yellowback}
            alt=""
          />
        </button>
      </Link>

      <div className="flex flex-row">
        <h1 className=" font-cookierun text-center mobile:text-4xl deskTop:text-5xl my-[1rem]">Information</h1>
      </div>

      <div className="w-[25rem] h-1/3 flex items-center">
        <div>
          <div className="font-cookierun inline-block text-xl">Reference link</div>
          <a href="https://quickdraw.withgoogle.com" target="_blank" rel="noreferrer">
            <img className="deskTop:w-[15rem] mobile:w-[12rem]" src={quickdraw} alt="" />
          </a>
        </div>
        <div className="w-[50%] ">
          <div>
            <div className="font-cookierun inline-block text-xl deskTop:ml-8 mobile:ml-3">GitHub link</div>
            <a href="https://github.com/ALLBACK-2022/DoodleDoodle" target="_blank" rel="noreferrer">
              <img className="deskTop:w-[10rem] mobile:w-[9rem] rounded-lg ml-8" src={smile} alt="" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-1 opacity-50 font-black my-[2rem] font-cookierun w-[100%]">About our Service</div>
      <div
        className="flex h-1/3 items-center space-around mobile:w-[100%] deskTop:w-[60%] 
      place-content-between px-[0.3rem]"
      >
        <AboutNeeds text=" 혼자서 또는 친구와 함께 두들두들!을 즐겨봐요 " />
        <AboutNeeds text=" 랜덤으로 주어지는 단어를 보고, 그림을 그려봐요" />
        <AboutNeeds text=" 학습된 AI모델은  여러분의 그림을 보고, 무엇을 그렸는지 예측해줍니다" />
      </div>
      <div className="bg-gray-1 opacity-50 font-black my-[1rem] font-cookierun w-[100%]">Contributors</div>
      <div className="flex flex-col mobile:w-[100%] deskTop:w-[70%] h-1/3 px-[0.5rem]">
        <div className="font-cookierun_m text-lg">Click on the profile!</div>
        <div className="flex w-[100%] h-[50%] justify-center space-x-[2rem] place-content-between">
          <Profile name="Dayon Hong" profile={woman3} url="https://github.com/Dayeon-Hong" />
          <Profile name="Seungjin Kim" profile={man2} url="https://github.com/ohksj77" />
          <Profile name="Halin Kim" profile={woman2} url="https://github.com/kimhalin" />
        </div>
        <div className="flex w-[100%] h-[50%] justify-center space-x-[2rem] place-content-between">
          <Profile name="Yunho Jung" profile={man1} url="https://github.com/yunhobb" />
          <Profile name="Hunhui Jeong" profile={man3} url="https://github.com/JeongHunHui" />
          <Profile name="Jiwon Han" profile={woman1} url="https://github.com/jiwon83" />
        </div>
      </div>
      <a href="https://www.flaticon.com/kr/packs/toys" className="font-cookierun" title="아이콘 출처">
        장난감 아이콘 제작자: Freepik - Flaticon
      </a>
    </div>
  );
}

export default About;
