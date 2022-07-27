// import { useMediaQuery } from 'react-responsive';
import quickdraw from '../assets/icons/quickdraw.png';
import AboutNeeds from '../components/AboutNeeds';
import Profile from '../components/Profile';

function About() {
  return (
    <div className="flex flex-col w-screen h-screen bg-white text-center border-primary border-[2rem] items-center">
      <h1 className="font-cookierun text-3xl my-[2rem]">Information</h1>
      <div className="w-[25rem] h-1/3 flex items-center">
        <img className="deskTop:w-[15rem] mobile:w-[8rem]" src={quickdraw} alt="" />
        <div className="w-[50%]">
          <div>
            <div className="font-cookierun inline-block text-xl">Reference</div>
            <div className="font-cookierun_s text-base">Quick, Draw!</div>
            <div>
              <a className="w-[100%]" href="https://quickdraw.withgoogle.com" target="_blank" rel="noreferrer">
                https://quickdraw.withgoogle.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-1 opacity-50 font-black my-[2rem] font-cookierun w-[100%]">Needs</div>
      <div
        className="flex h-1/3 items-center space-around mobile:w-[100%] deskTop:w-[55%] 
      place-content-between px-[0.3rem]"
      >
        <AboutNeeds text="태블릿PC 사용의 대중화로 모바일로 필기, 그림, 낙서를 하는 사용자 증가" />
        <AboutNeeds text="무겁고, 장기간 이용하는 게임보다 짧은시간 가볍게 즐길 수 있는 게임 증가" />
        <AboutNeeds text="SNS 공유 목적인 심플한 웹사이트 이용 증가" />
      </div>
      <div className="bg-gray-1 opacity-50 font-black my-[1rem] font-cookierun w-[100%]">Contributors</div>
      <div className="flex flex-col mobile:w-[100%] deskTop:w-[70%] h-1/3 px-[0.5rem]">
        <div className="font-cookierun_m text-lg">Click on the profile!</div>
        <div className="flex w-[100%] h-[50%] justify-center space-x-[2rem] place-content-between">
          <Profile name="Dayeon Hong" url="https://github.com/Dayeon-Hong" />
          <Profile name="Seungjin Kim" url="https://github.com/ohksj77" />
          <Profile name="Halin Kim" url="https://github.com/kimhalin" />
        </div>
        <div className="flex w-[100%] h-[50%] justify-center space-x-[2rem] place-content-between">
          <Profile name="Yunho Jeong" url="https://github.com/yunhobb" />
          <Profile name="Hunhui Jeong" url="https://github.com/JeongHunHui" />
          <Profile name="Jiwon Han" url="https://github.com/jiwon83" />
        </div>
      </div>
    </div>
  );
}

export default About;
