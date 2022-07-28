import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import ResultText from '../components/ResultText';
import sketchbook from '../assets/icons/sketchbook.png';
import ResultPieChart from '../components/ResultPieChart';
import PieChartLabel from '../components/PieChartLabel';
import ResultButtons from '../components/ResultButtons';
import ResultSimilarity from '../components/ResultSimilarity';
import ResultImage from '../components/ResultImage';
import GameBGImg from '../components/GameBGImg';

function ResultforOne() {
  const [chart, setChart] = useState([{ name: '', value: 0.0 }]);
  const [randomWordData, setRandomWordData] = useState({ name: '', value: 0.0 });
  const [imageUrl, setImageUrl] = useState([{ url: '' }]);

  // 여기서 POST API 불러오기(각 데이터 넣어주기)
  ResultSimilarity(setChart, setRandomWordData, setImageUrl);

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });

  const isPC = useMediaQuery({
    query: '(min-width: 701px)',
  });

  return (
    <div id="temp" className="relative w-screen h-screen bg-primary select-none">
      <GameBGImg isGamePage={false} />
      <div
        className="flex absolute deskTop:px-[8vw] mobile:px-[4vw]
        pt-[8vh] w-full h-full flex-col"
      >
        <div
          className="font-cookierun
          deskTop:text-left deskTop:text-[5vmin]
          mobile:text-center mobile:text-[3vh]"
        >
          AI는 무엇으로 예측했을까요?
        </div>
        <div
          className="flex deskTop:flex-row mobile:flex-col-reverse
          deskTop:mt-[3vh] items-center justify-center"
        >
          {isMobile && (
            <div
              className="relative flex-col justify-center top-[5vh]
              max-h-[40vh] w-[100%] h-[40vh]"
            >
              <div className="flex flex-row space-x-[3vw] justify-center">
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[0].value} />
                    <ResultImage imageUrl={imageUrl[0]} />
                  </div>
                  <PieChartLabel text={chart[0].name} />
                </div>
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[1].value} />
                    <ResultImage imageUrl={imageUrl[1]} />
                  </div>
                  <PieChartLabel text={chart[1].name} />
                </div>
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[2].value} />
                    <ResultImage imageUrl={imageUrl[2]} />
                  </div>
                  <PieChartLabel text={chart[2].name} />
                </div>
              </div>

              <div className="flex flex-row mt-[4vh] space-x-[3vw] justify-center">
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[3].value} />
                    <ResultImage imageUrl={imageUrl[3]} />
                  </div>
                  <PieChartLabel text={chart[3].name} />
                </div>
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[4].value} />
                    <ResultImage imageUrl={imageUrl[4]} />
                  </div>
                  <PieChartLabel text={chart[4].name} />
                </div>
              </div>
            </div>
          )}
          {isPC && (
            <div
              className="relative justify-center top-[2vh]
              max-w-[60vh] max-h-[60vh] w-[40vw] h-[40vw]"
            >
              <div
                className="absolute flex-col w-[20vw] h-[20vw]
                max-h-[30vh] max-w-[30vh] left-[2%] top-[2%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[0].value} />
                  <ResultImage imageUrl={imageUrl[0]} />
                </div>
                <PieChartLabel text={chart[0].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
                max-h-[18vh] max-w-[18vh] left-[70%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[1].value} />
                  <ResultImage imageUrl={imageUrl[1]} />
                </div>
                <PieChartLabel text={chart[1].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
                max-h-[18vh] max-w-[18vh] left-[65%] top-[40%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[2].value} />
                  <ResultImage imageUrl={imageUrl[2]} />
                </div>
                <PieChartLabel text={chart[2].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
                max-h-[18vh] max-w-[18vh] left-[35%] top-[70%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[3].value} />
                  <ResultImage imageUrl={imageUrl[3]} />
                </div>
                <PieChartLabel text={chart[3].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
                max-h-[18vh] max-w-[18vh] top-[70%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[4].value} />
                  <ResultImage imageUrl={imageUrl[4]} />
                </div>
                <PieChartLabel text={chart[4].name} />
              </div>
            </div>
          )}
          <div
            className="deskTop:w-[40vw] deskTop:h-[40vw] deskTop:max-w-[65vh] deskTop:max-h-[65vh]
            mobile:h-[30vh] deskTop:ml-[4vw] flex-col justify-center"
          >
            <div
              className="flex justify-center items-center relative 
            deskTop:h-[80%] mobile:h-[90%] mobile:mb-[-1vh]"
            >
              <img src={sketchbook} className="deskTop:h-[100%] mobile:h-[90%]" alt="" />
              <img
                src={imageUrl}
                alt=""
                className="absolute h-[50%] top-1/2 left-1/2
                -translate-y-[50%] -translate-x-[50%]"
              />
            </div>
            <ResultText name={randomWordData.name} value={randomWordData.value} textSize={3} />

            {isPC && <ResultButtons isforOne />}
          </div>
        </div>
        <div className="absolute bottom-[9vh] items-center w-[92vw]">{isMobile && <ResultButtons isforOne />}</div>
      </div>
    </div>
  );
}
export default ResultforOne;
