import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
import axios from 'axios';

import ResultText from '../components/ResultText';
import sketchbook from '../assets/icons/sketchbook.png';
import ResultPieChart from '../components/ResultPieChart';
import PieChartLabel from '../components/PieChartLabel';
import ResultButtons from '../components/ResultButtons';
import ResultImage from '../components/ResultImage';
import GameBGImg from '../components/GameBGImg';

import testImage from '../assets/icons/mobiledoodle_8.png'; // 기본 이미지
import MobileBottomBtn from '../components/MobileBottomBtn';

const baseURL = 'http://localhost:5000/api/v1/draws/results/single';

function ResultforOne() {
  const [chart, setChart] = useState([{ name: '?', value: 0 }]); // 유사도 상위 5개 이름과 유사도
  const [randomWordData, setRandomWordData] = useState({ name: '?', value: 0, imageUrl: testImage }); // 주어진 단어의 이름과 유사도
  const [imageUrl, setImageUrl] = useState([testImage]); // 유사도 상위 5개의 이미지들
  const [isRender, setIsRender] = useState([0, 0, 0, 0, 0]);

  const location = useLocation();

  // 백엔드에서 API 불러오는 함수
  async function getResult() {
    // 혹시 axios로 안되면 이걸로
    /* fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'game-id': location.state.gameId,
        'draw-id': location.state.drawId,
        'task-id': location.state.taskId,
      }),
    })
      .then(res => res.json())
      .then(res =>
        res.topfive.foreach(function fe(element) {
          array
            .push({ name: element.dictionary.name, value: element.similarity })
            .then(setImageUrl(element.dictionary.img_url));
        }),
      )
      .then(setChartData(array))
      .then(res =>
        setRandomWordData({
          name: res.randword.dictionary.name,
          value: res.randword.similarity,
        }),
      ); */

    const response = await axios.post(baseURL, {
      'game-id': location.state.gameId,
      'draw-id': location.state.drawId,
      'task-id': location.state.taskId,
    });
    const topfiveArray = [];
    const imageArray = [];
    response.topfive.forEach(element => {
      topfiveArray.push({
        name: element.dictionary.name,
        value: element.similarity,
      });
      imageArray.push(element.dictionary.img_url);
    });
    setImageUrl(imageArray);
    setChart(topfiveArray);
    setRandomWordData({
      name: response.randword.dictionary.name,
      value: response.randword.similarity,
      imageUrl: response.randword.dictionary.img_url,
    });
    setIsRender([0, 1, 2, 3, 4]);
  }

  useEffect(() => {
    // 여기서 POST API 불러오기(각 데이터 넣어주기)
    getResult();
    console.log('useEffect() here');
  }, []);

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
                    <ResultPieChart chartData={chart[isRender[0]].value} />
                    <ResultImage imageUrl={imageUrl[isRender[0]]} />
                  </div>
                  <PieChartLabel text={chart[isRender[0]].name} />
                </div>
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[isRender[1]].value} />
                    <ResultImage imageUrl={imageUrl[isRender[1]]} />
                  </div>
                  <PieChartLabel text={chart[isRender[1]].name} />
                </div>
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[isRender[2]].value} />
                    <ResultImage imageUrl={imageUrl[isRender[2]]} />
                  </div>
                  <PieChartLabel text={chart[isRender[2]].name} />
                </div>
              </div>

              <div className="flex flex-row mt-[4vh] space-x-[3vw] justify-center">
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[isRender[3]].value} />
                    <ResultImage imageUrl={imageUrl[isRender[3]]} />
                  </div>
                  <PieChartLabel text={chart[isRender[3]].name} />
                </div>
                <div className="flex-col w-[12.5vh] h-[12.5vh] max-h-[28.7vw]">
                  <div className="relative h-[100%]">
                    <ResultPieChart chartData={chart[isRender[4]].value} />
                    <ResultImage imageUrl={imageUrl[isRender[4]]} />
                  </div>
                  <PieChartLabel text={chart[isRender[4]].name} />
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
                  <ResultPieChart chartData={chart[isRender[0]].value} />
                  <ResultImage imageUrl={imageUrl[isRender[0]]} />
                </div>
                <PieChartLabel text={chart[isRender[0]].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
              max-h-[18vh] max-w-[18vh] left-[70%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[isRender[1]].value} />
                  <ResultImage imageUrl={imageUrl[isRender[1]]} />
                </div>
                <PieChartLabel text={chart[isRender[1]].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
              max-h-[18vh] max-w-[18vh] left-[65%] top-[40%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[isRender[2]].value} />
                  <ResultImage imageUrl={imageUrl[isRender[2]]} />
                </div>
                <PieChartLabel text={chart[isRender[2]].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
              max-h-[18vh] max-w-[18vh] left-[35%] top-[70%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[isRender[3]].value} />
                  <ResultImage imageUrl={imageUrl[isRender[3]]} />
                </div>
                <PieChartLabel text={chart[isRender[3]].name} />
              </div>
              <div
                className="absolute flex-col w-[12vw] h-[12vw]
              max-h-[18vh] max-w-[18vh] top-[70%]"
              >
                <div className="relative h-[100%]">
                  <ResultPieChart chartData={chart[isRender[4]].value} />
                  <ResultImage imageUrl={imageUrl[isRender[4]]} />
                </div>
                <PieChartLabel text={chart[isRender[4]].name} />
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
                src={randomWordData.imageUrl}
                alt=""
                className="absolute h-[50%] top-1/2 left-1/2
              -translate-y-[50%] -translate-x-[50%]"
              />
            </div>
            <ResultText name={randomWordData.name} value={randomWordData.value} textSize={10} />
            <div className="mt-[4rem]">{isPC && <ResultButtons isforOne />}</div>
          </div>
        </div>

        <div className="absolute text-center bottom-[9vh] items-center w-[92vw]">
          {isMobile && <MobileBottomBtn isforOne />}
        </div>
      </div>
    </div>
  );
}
export default ResultforOne;
