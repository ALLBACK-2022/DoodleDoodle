import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
import axios from 'axios';

import ResultOneSketchBook from '../components/ResultOneSketchBook';
import GameBGImg from '../components/GameBGImg';
import TopFiveResult from '../components/TopFiveResult';

import testImage from '../assets/icons/mobiledoodle_8.png'; // 기본 이미지
import MobileBottomBtn from '../components/MobileBottomBtn';

const baseURL = 'http://localhost:5000/api/v1/draws/results/single';
const getImageURL = 'http://localhost:5000/api/v1/results/draw/';

function ResultforOne() {
  const [chart, setChart] = useState([{ name: '?', value: 0.0 },]); // 유사도 상위 5개 이름과 유사도
  const [randomWordData, setRandomWordData] = useState({ name: '?', value: 0, imageUrl: testImage }); // 주어진 단어의 이름과 유사도
  const [imageUrl, setImageUrl] = useState([testImage]); // 유사도 상위 5개의 이미지들
  const [isLoad, setIsLoad] = useState(false);
  const [isImageLoad, setIsImageLoad] = useState(false);

  const location = useLocation();

  // drawId로 이미지 URL가져오는 함수
  async function getRandomWordData(randomWord) {
    await axios
      .get(getImageURL + location.state.drawId.toString())
      .then(response => {
        console.log(response.data);
        console.log(randomWord);
        setRandomWordData({
          name: randomWord.dictionary.name,
          value: randomWord.similarity,
          // 페이지 넘어오며 받은 drawId로 API호출해서 이미지파일 받아옴
          imageUrl: response.data,
        });
        setIsImageLoad(true);
      })
      .catch(error => console.log(error));
  }

  let testCount = 0;
  // 백엔드에서 API 불러오는 함수
  async function getResult() {
    // 결과 받아오는 API 호출
    console.log('getResult Start');
    console.log(location.state.taskId);
    await axios
      .post(baseURL, {
        'game-id': location.state.gameId,
        'draw-id': location.state.drawId,
        'task-id': location.state.taskId,
      })
      // 호출이 완료되면
      .then(response => {
        testCount += 1;
        console.log(testCount, ': ', response);
        const topfiveArray = [];
        const imageArray = [];
        // 유사도 상위 5개 데이터 저장
        const top = response.data.topfive;
        const randomWord = response.data.randword;
        console.log(top);
        // topfiveArray에 5개 데이터의 이름과 유사도 값을 넣고
        // imageArray에 5개 데이터의 이미지를 사전에서 불러와 넣는다
        for (let i = 0; i < 5; i += 1) {
          console.log(top[i].dictionary.name, ': ', top[i].similarity);
          topfiveArray.push({
            name: top[i].dictionary.name,
            value: top[i].similarity,
          });
          imageArray.push(top[i].dictionary.img_url);
        }
        console.log('<randomWord>', randomWord.dictionary.name, ': ', randomWord.similarity);
        // 유사도 상위5개 차트의 이미지와 이름, 유사도값 업데이트
        setImageUrl(imageArray);
        setChart(topfiveArray);
        setIsLoad(true);
        // 처음 주어진 랜덤단어의 이름, 유사도, 내가 그렸던 그림 업데이트
        getRandomWordData(randomWord);
      })
      .catch(error => {
        testCount += 10;
        console.log('test', testCount, ': ', error);
      });
  }

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });

  const isPC = useMediaQuery({
    query: '(min-width: 701px)',
  });

  useEffect(() => {
    console.log('useEffect() here');
    getResult();
  }, []);

  // 여기서 POST API 불러오기(각 데이터 넣어주기)

  return (
    <div id="resultonepage" className="relative w-screen h-screen bg-primary select-none">
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
          {isMobile && isLoad && isImageLoad && (
            <div
              className="relative flex-col justify-center top-[5vh]
              max-h-[40vh] w-[100%] h-[40vh]"
            >
              <div className="flex flex-row space-x-[3vw] justify-center">
                {[0, 1, 2].map(element => (
                  <TopFiveResult 
                    key={element}
                    isPc={false}
                    rank={element}
                    chartData={chart[element]}
                    imageUrl={imageUrl[element]}
                  />
                ))}
              </div>

              <div className="flex flex-row mt-[4vh] space-x-[3vw] justify-center">
                {[3, 4].map(element => (
                  <TopFiveResult
                    key={element}
                    isPc={false}
                    rank={element}
                    chartData={chart[element]}
                    imageUrl={imageUrl[element]}
                  />
                ))}
              </div>
            </div>
          )}
          {isPC && isLoad && isImageLoad && (
            <div
              className="relative justify-center top-[2vh]
            max-w-[60vh] max-h-[60vh] w-[40vw] h-[40vw]"
            >
              {[0, 1, 2, 3, 4].map(element => (
                <TopFiveResult
                  key={element}
                  isPc={isPC}
                  rank={element}
                  chartData={chart[element]}
                  imageUrl={imageUrl[element]}
                />
              ))}
            </div>
          )}
          {isLoad && isImageLoad && (
            <ResultOneSketchBook randomWordData={randomWordData} stateData={location.state} isPC={isPC} />
          )}
        </div>
        <div className="absolute text-center bottom-[9vh] items-center w-[92vw]">
          {isMobile && <MobileBottomBtn isforOne />}
        </div>
      </div>
    </div>
  );
}
export default ResultforOne;
