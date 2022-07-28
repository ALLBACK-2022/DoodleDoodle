// import ResultText from '../components/ResultText';

import BGyelllowImg from '../assets/icons/BGyellowImg.png';
import ResultButtons from '../components/ResultButtons';
import ResultRank from '../components/ResultRank';

function ResultMany() {
  return (
    <div className="flex relative w-full h-full bg-primary-1">
      <img id="BGyellowImg" src={BGyelllowImg} className="absolute px-[2vw] py-[2vh] w-screen h-screen" alt="" />

      <div className="flex absolute px-[8vw] py-[8vh] w-screen h-screen flex-col">
        <h1
          className="ml-[1%] text-black font-cookierun text-left
        deskTop:text-[3.5vw] mobile:text-[6vw]"
        >
          AI는 무엇으로 예측했을까요?
        </h1>

        <div className="flex mt-3 mx-1 mb-30 ">
          <div className=" flex flex-wrap mx-10">
            {/* 구현하지 못한 부분 : 스케치북 개수 = player수  */}
            <ResultRank />
            <ResultRank />
            <ResultRank />
            <ResultRank />
          </div>
        </div>

        <div className="flex flex-row mt-[3vh] mr-[10rem] mb-[10vh] items-stretch">
          {/* 구현 하지 못한 부분: 버튼 오른쪽 아래 위치로 이동 */}
          <div>
            <ResultButtons isforOne2 />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResultMany;
