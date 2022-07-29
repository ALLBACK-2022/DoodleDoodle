import home from '../assets/icons/home2.png';
import share from '../assets/icons/share2.png';
import back from '../assets/icons/back.png';
import changeImg from '../assets/icons/changeImg.png';

function MobileBottomBtn({ goback }) {
  if (goback) {
    return (
      <div className="flex w-[80%] items-center self-center place-content-center place-content-between">
        <div className="flex flex-col items-center  space-y-[0.3rem]">
          <button className="h-[2.4rem] w-[2.4rem]">
            <img className="h-[2.4rem] w-[2.4rem]" src={share} alt="" />
          </button>

          <div className="font-cookierun_m text-[1rem]">저장하기</div>
        </div>
        <div className="flex flex-col items-center  space-y-[0.3rem]">
          <button className="h-[2.4rem] w-[2.4rem]">
            <img className="h-[2rem] w-[2rem]" src={back} alt="" />
          </button>
          <div className="font-cookierun_m text-[1rem]">뒤로가기</div>
        </div>
        <div className="flex flex-col items-center  space-y-[0.3rem]">
          <button className="h-[2.4rem] w-[2.4rem]">
            <img className="h-[2.4rem] w-[2.4rem]" src={home} alt="" />
          </button>
          <div className="font-cookierun_m text-[1rem]">홈으로</div>
        </div>
      </div>
    );
  }
  return (
    <div className="inline-flex w-[80%] items-center self-center place-content-center place-content-between">
      <div className="flex flex-col items-center  space-y-[0.3rem]">
        <button className="h-[2.4rem] w-[2.4rem] ">
          <img className="h-[2.4rem] w-[2.4rem]" src={share} alt="" />
        </button>

        <div className="font-cookierun_m text-[1rem]">저장하기</div>
      </div>
      <div className="flex flex-col items-center  space-y-[0.3rem]">
        <button className="h-[2.4rem] w-[2.4rem]">
          <img className="h-[2.4rem] w-[2.4rem]" src={changeImg} alt="" />
        </button>
        <div className="font-cookierun_m text-[1rem]">다시하기</div>
      </div>
      <div className="flex flex-col items-center space-y-[0.3rem]">
        <button className="h-[2.4rem] w-[2.4rem]">
          <img className="h-[2.4rem] w-[2.4rem]" src={home} alt="" />
        </button>
        <div className="font-cookierun_m text-[1rem]">홈으로</div>
      </div>
    </div>
  );
}

export default MobileBottomBtn;
