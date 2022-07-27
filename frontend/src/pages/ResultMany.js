import ResultText from '../components/ResultText';

import BGyelllowImg from '../assets/icons/BGyellowImg.png';
import ResultButtons from '../components/ResultButtons';
import ResultRank from '../components/ResultRank';

function ResultMany() {
  return (
    <div className="flex relative w-full h-full bg-primary-1">
      <img id="gameBGImg" src={BGyelllowImg} className="px-[2vw] py-[2vh] w-screen h-screen" alt="" />

      <div className="flex absolute px-[8vw] py-[12vh] w-screen h-screen flex-col">
        <ResultText text="누가 더 똑같이 그렸을까요?" />
        <div className="flex mt-10 mx-1 mb-30 ">
          <div className=" flex flex-wrap mx-10">
            {/* 구현하지 못한 부분 : 스케치북 개수 = player수  */}
            <ResultRank />
            <ResultRank />
            <ResultRank />
            <ResultRank />
          </div>
        </div>

        <div className="flex flex-row mt-[3vh] mr-[10rem] mb-[1vh] items-stretch">
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
