import useState from 'react';
import ResultText from '../components/ResultText';
import gameBGImg from '../assets/icons/gameBGImg.png';
import sketchbook from '../assets/icons/sketchbook.png';
import ResultPieChart from '../components/ResultPieChart';
import PieChartLabel from '../components/PieChartLabel';
import ResultButtons from '../components/ResultButtons';
import ResultSimilarity from '../components/ResultSimilarity';
import ResultImage from '../components/ResultImage';

function ResultforOne() {
  const [chartData, setChartData] = useState([{ name: '', value: 0.0 }]);
  const [randomWordData, setRandomWordData] = useState({ name: '', value: 0.0 });
  const [imageUrl, setImageUrl] = useState([{ url: '' }]);

  // 여기서 POST API 불러오기(각 데이터 넣어주기)
  ResultSimilarity(setChartData, setRandomWordData, setImageUrl);

  return (
    <div className="flex relative w-full h-full bg-primary">
      <img id="gameBGImg" src={gameBGImg} className="px-[2vw] py-[2vh] w-screen h-screen" alt="" />

      <div className="flex absolute px-[8vw] py-[8vh] w-screen h-screen flex-col">
        <ResultText text="AI는 무엇으로 예측했을까요?" />
        <div className="flex flex-row ml-[4vw] mt-[6vh] items-stretch">
          <div className="w-[45%] sm:h-[30%] md:h-[60%] lg:h-[100%]">
            <div className="relative inline-flex flex-col w-[50%] h-[60%]">
              <ResultPieChart chartData={chartData[0].value} />
              <ResultImage imageUrl={imageUrl[0]} />
              <PieChartLabel text={chartData[0].name} />
            </div>
            <div className="inline-flex flex-col w-[25%] h-[32%] -translate-y-[80%] translate-x-[20%]">
              <ResultPieChart chartData={chartData[1].value} />
              <ResultImage imageUrl={imageUrl[1]} />
              <PieChartLabel text={chartData[2].name} />
            </div>
            <div className="inline-flex flex-col w-[25%] h-[32%] -translate-x-[100%] translate-y-[30%]">
              <ResultPieChart chartData={chartData[2].value} />
              <ResultImage imageUrl={imageUrl[2]} />
              <PieChartLabel text={chartData[3].name} />
            </div>
            <div className="inline-flex flex-col w-[25%] h-[32%] translate-y-[15%]">
              <ResultPieChart chartData={chartData[3].value} />
              <ResultImage imageUrl={imageUrl[3]} />
              <PieChartLabel text={chartData[4].name} />
            </div>
            <div className="inline-flex flex-col w-[25%] h-[32%] translate-x-[20%] translate-y-[15%]">
              <ResultPieChart chartData={chartData[4].value} />
              <ResultImage imageUrl={imageUrl[5]} />
              <PieChartLabel text="지우개" />
            </div>
          </div>
          <div className="w-[45%] ml-[3vw] flex flex-col justify-items-centers">
            <div className="flex self-center relative">
              <img src={sketchbook} alt="" />
              <img
                src={gameBGImg}
                alt=""
                className="absolute w-[50%] h-[50%] top-1/2 left-1/2 -translate-y-[50%] -translate-x-[50%]"
              />
            </div>

            <ResultText
              text={`AI는 ${randomWordData.name}를 ${randomWordData.value}%밖에 예측을 못했네요..`}
              textSize={3}
            />
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
