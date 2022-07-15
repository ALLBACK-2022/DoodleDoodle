import ResultTitle from '../components/ResultTitle';
import gameBGImg from '../assets/icons/gameBGImg.png';
import ResultPieChart from '../components/ResultPieChart';

function ResultforOne() {
  return (
    <div>
      <div className="flex relative w-full h-full">
        <img id="gameBGImg" src={gameBGImg} className="px-[2vw] py-[2vh] w-screen h-screen" alt="" />
        <ResultTitle text="AI는 무엇으로 예측했을까요?" />
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[70.25rem] h-[36.3rem]">
          <div className="w-[15.625rem] h-[15.625rem]">
            <ResultPieChart />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResultforOne;
