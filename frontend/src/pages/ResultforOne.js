import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {useState} from 'react'
import ResultText from '../components/ResultText';
import sketchbook from '../assets/icons/sketchbook.png';
import ResultPieChart from '../components/ResultPieChart';
import PieChartLabel from '../components/PieChartLabel';
import ResultButtons from '../components/ResultButtons';
import ResultSimilarity from '../components/ResultSimilarity';
import ResultImage from '../components/ResultImage';
import GameBGImg from '../components/GameBGImg';
import ResultImage from '../components/ResultImage'

function ResultforOne() {
  const [chart, setChart] = useState([{ name: '', value: 0.0 }]);
  const [randomWordData, setRandomWordData] = useState({ name: '', value: 0.0 });
  const [imageUrl, setImageUrl] = useState([{ url: '' }]);
  const [chart, setChart] = useState([{ name: '', value: 0.0 },])
  const [randomWordData, setRandomWordData] = useState({ name: '', value: 0.0 })
  const [imageUrl, setImageUrl] = useState([{url: ''},])

  // 여기서 POST API 불러오기(각 데이터 넣어주기)
  ResultSimilarity(setChart, setRandomWordData, setImageUrl);

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });

  const isPC = useMediaQuery({
    query: '(min-width: 701px)',
  });

  ResultSimilarity(setChart, setRandomWordData, setImageUrl)
  
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
          mobile:text-center mobile:text-[6.5vmin]"
        >
          AI는 무엇으로 예측했을까요?
        </div>
        <div
          className="flex deskTop:flex-row mobile:flex-col-reverse
          deskTop:mt-[3vh] items-center justify-center"
        >
          {isMobile && (
            <div
              className="relative flex-col justify-center top-[4vh]
              max-h-[65vh] w-[100%] h-[40vw]"
            >
              <div className="flex flex-row space-x-[3vw] justify-center">
                <div className="flex-col w-[28vw] h-[28vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[0].value} />
                    <ResultImage imageUrl={imageUrl[0]} />
                  </div>
                  <PieChartLabel text={chart[0].name} />
                </div>
                <div className="flex-col w-[28vw] h-[28vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[1].value} />
                    <ResultImage imageUrl={imageUrl[1]} />
                  </div>
                  <PieChartLabel text={chart[1].name} />
                </div>
                <div className="flex-col w-[28vw] h-[28vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[2].value} />
                    <ResultImage imageUrl={imageUrl[2]} />
                  </div>
                  <PieChartLabel text={chart[2].name} />
                </div>
              </div>
    <div id="resultonepage" className="flex relative w-full h-full bg-primary">
      <img id="gameBGImg" src={gameBGImg} className="px-[2vw] py-[2vh] w-screen h-screen" alt="" />

              <div className="flex flex-row mt-[4vh] space-x-[3vw] justify-center">
                <div className="flex-col w-[28vw] h-[28vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[3].value} />
                    <ResultImage imageUrl={imageUrl[3]} />
                  </div>
                  <PieChartLabel text={chart[3].name} />
                </div>
                <div className="flex-col w-[28vw] h-[28vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[4].value} />
                    <ResultImage imageUrl={imageUrl[4]} />
                  </div>
                  <PieChartLabel text={chart[4].name} />
                </div>
              </div>
      <div className="flex absolute px-[8vw] py-[8vh] w-screen h-screen flex-col">
        <ResultText text="AI는 무엇으로 예측했을까요?" />
        <div className="flex flex-row ml-[4vw] mt-[6vh] items-stretch">
          <div className="w-[45%] sm:h-[30%] md:h-[60%] lg:h-[100%]">
            <div className="relative inline-flex flex-col w-[50%] h-[60%]">
              <ResultPieChart chartData={chart[0].value} />
              <ResultImage imageUrl={imageUrl[0]} />
              <PieChartLabel text={chart[0].name} />
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
            <div className="inline-flex flex-col w-[25%] h-[32%] -translate-y-[80%] translate-x-[20%]">
              <ResultPieChart chartData={chart[1].value} />
              <ResultImage imageUrl={imageUrl[1]} />
              <PieChartLabel text={chart[1].name} />
            </div>
          )}
          <div
            className="deskTop:w-[40vw] deskTop:h-[40vw] deskTop:max-w-[65vh] deskTop:max-h-[65vh]
            mobile:h-[30vh] mobile:max-h-[65.5vw] deskTop:ml-[4vw] flex-col justify-center"
          >
            <div className="flex justify-center relative deskTop:h-[80%]">
              <img src={sketchbook} className="deskTop:h-[100%]" alt="" />
            <div className="inline-flex flex-col w-[25%] h-[32%] -translate-x-[100%] translate-y-[30%]">
              <ResultPieChart chartData={chart[2].value} />
              <ResultImage imageUrl={imageUrl[2]} />
              <PieChartLabel text={chart[2].name} />
            </div>
            <div className="inline-flex flex-col w-[25%] h-[32%] translate-y-[15%]">
              <ResultPieChart chartData={chart[3].value} />
              <ResultImage imageUrl={imageUrl[3]} />
              <PieChartLabel text={chart[3].name} />
            </div>
            <div className="inline-flex flex-col w-[25%] h-[32%] translate-x-[20%] translate-y-[15%]">
              <ResultPieChart chartData={chart[4].value} />
              <ResultImage imageUrl={imageUrl[4]} />
              <PieChartLabel text={chart[4].name} />
            </div>
          </div>
          <div className="w-[45%] ml-[3vw] flex flex-col justify-items-centers">
            <div className="flex self-center relative">
              <img src={sketchbook} alt="" />
              <img
                src={imageUrl}
                alt=""
                className="absolute h-[50%] top-1/2 left-1/2
                -translate-y-[50%] -translate-x-[50%]"
              />
            </div>
            <ResultText name={randomWordData.name} value={randomWordData.value} textSize={3} />
            {isPC && <ResultButtons isforOne />}

            <ResultText name={randomWordData.name} value={randomWordData.value} textSize={3} />
            <div>
              <ResultButtons isforOne />
            </div>
          </div>
        </div>
        <div className="absolute bottom-[9vh]">{isMobile && <ResultButtons isforOne />}</div>
      </div>
    </div>
  );
}
export default ResultforOne;