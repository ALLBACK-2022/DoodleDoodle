import ResultText from '../components/ResultText';
import gameBGImg from '../assets/icons/gameBGImg.png';
import sketchbook from '../assets/icons/sketchbook.png';
import ResultPieChart from '../components/ResultPieChart';
import PieChartLabel from '../components/PieChartLabel';
import ResultButtons from '../components/ResultButtons';

function ResultforOne() {
  const chartData = [
    { name: '거북이', value: 70 },
    { name: '거북이', value: 30 },
  ];

  // 여기서 GET API 불러오기(각 데이터 넣어주기)
  return (
    <div className="flex relative w-full h-full bg-primary">
      <img id="gameBGImg" src={gameBGImg} className="px-[2vw] py-[2vh] w-screen h-screen" alt="" />

      <div className="flex absolute px-[8vw] py-[8vh] w-screen h-screen flex-col">
        <ResultText text="AI는 무엇으로 예측했을까요?" />
        <div className="flex flex-row ml-[4vw] mt-[6vh] h-[80%]">
          <div className="w-[45%]">
            <div className="relative inline-flex flex-col w-[50%] h-[60%]">
              <ResultPieChart chartData={chartData} />
              <img
                src={sketchbook}
                alt=""
                className="absolute w-[50%] h-[50%] top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]"
              />
              <PieChartLabel text="시계" />
            </div>
            <div className="inline-flex flex-col w-[20%] h-[25%] -translate-y-[100%] translate-x-[20%]">
              <ResultPieChart chartData={chartData} />
              <img
                src={sketchbook}
                alt=""
                className="absolute w-[40%] h-[40%] top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]"
              />
              <PieChartLabel text="원숭이" />
            </div>
            <div className="inline-flex flex-col w-[20%] h-[25%] -translate-x-[100%] translate-y-[30%]">
              <ResultPieChart chartData={chartData} />
              <img
                src={sketchbook}
                alt=""
                className="absolute w-[40%] h-[40%] top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]"
              />
              <PieChartLabel text="책상" />
            </div>
            <div className="inline-flex flex-col w-[20%] h-[25%] translate-y-[15%]">
              <ResultPieChart chartData={chartData} />
              <img
                src={sketchbook}
                alt=""
                className="absolute w-[40%] h-[40%] top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]"
              />
              <PieChartLabel text="우산" />
            </div>
            <div className="inline-flex flex-col w-[20%] h-[25%] translate-x-[50%] translate-y-[15%]">
              <ResultPieChart chartData={chartData} />
              <img
                src={sketchbook}
                alt=""
                className="absolute w-[40%] h-[40%] top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]"
              />
              <PieChartLabel text="지우개" />
            </div>
          </div>
          <div className="w-[45%] ml-[3vw] flex flex-col justify-items-centers">
            <img src={sketchbook} alt="" />
            <ResultText text="AI는 (지정 단어)를 6%밖에 예측을 못했네요.." textSize={3} />
            <div>
              <ResultButtons isforOne />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResultforOne;
