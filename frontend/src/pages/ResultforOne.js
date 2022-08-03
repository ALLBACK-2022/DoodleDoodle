import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
import axios from 'axios';

import ResultOneSketchBook from '../components/ResultOneSketchBook';
import GameBGImg from '../components/GameBGImg';
import TopFiveResult from '../components/TopFiveResult';

import testImage from '../assets/icons/mobiledoodle_8.png'; // 기본 이미지
import ResultButtons from '../components/ResultButtons';

const baseURL = 'http://localhost:5000/api/v1/results/draw/';

function ResultforOne() {
  const [chart, setChart] = useState([{ name: '?', value: 0.0 }]); // 유사도 상위 5개 이름과 유사도
  const [randomWordData, setRandomWordData] = useState({ name: '?', value: 0, imageUrl: testImage }); // 주어진 단어의 이름과 유사도
  const [imageUrl, setImageUrl] = useState([testImage]); // 유사도 상위 5개의 이미지들
  const [isLoad, setIsLoad] = useState(false);

  const defaultData = { name: '?', value: 0.0 };

  const location = useLocation();

  let testCount = 0;
  // 백엔드에서 API 불러오는 함수
  async function getResult() {
    // 결과 받아오는 API 호출
    console.log('getResult Start');
    const drawId = location.state.isFromGamePage ? location.state.drawId[0] : location.state.drawId;
    await axios
      .get(baseURL.concat(drawId))
      // 호출이 완료되면
      .then(response => {
        testCount += 1;
        console.log(testCount, ': ', response);
        const topfiveArray = [];
        const imageArray = [];
        // 유사도 상위 5개 데이터 저장
        const top = response.data.topfive;
        // 반복문 돌려서 randomWord
        const randomWord = response.data.randword;
        const userDoodle = response.data.doodle;
        console.log(top, userDoodle);
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
        setRandomWordData({
          name: randomWord.dictionary.name,
          value: randomWord.similarity,
          // 페이지 넘어오며 받은 drawId로 API호출해서 이미지파일 받아옴
          imageUrl: userDoodle,
        });
      })
      .catch(error => {
        console.log('test', testCount, ' error: ', error);
        if (error) {
          setChart([defaultData, defaultData, defaultData, defaultData, defaultData]);
          setImageUrl([testImage, testImage, testImage, testImage, testImage]);
          setRandomWordData({ name: defaultData.name, value: defaultData.value, imageUrl: testImage });
          setIsLoad(true);
        }
      });
  }
  function setResultString(word, similarity) {
    if (similarity < 30) {
      return `AI는 ${word}을 ${similarity}% 밖에 예측못했네요...`;
    }
    if (similarity < 60) {
      return `AI는 ${word}을 ${similarity}% 정도로 예측했네요.`;
    }
    return `AI는 ${word}을 ${similarity}% 나, 예측했어요!`;
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
      <GameBGImg pageName="ResultforOne" />
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
          {isMobile && isLoad && (
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
          {isPC && isLoad && (
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
          {isLoad && (
            <ResultOneSketchBook
              randomWordData={randomWordData}
              isPC={isPC}
              isFromGamePage={location.state.isFromGamePage}
              text={setResultString(randomWordData.name, randomWordData.value)}
            />
          )}
        </div>
        {isMobile && (
          <div className="absolute text-center bottom-[9vh] items-center w-[92vw]">
            <ResultButtons
              isforOne
              isFromGamePage={location.state.isFromGamePage}
              userNum={1}
              img={randomWordData.imageUrl}
              resultString={setResultString(randomWordData.name, randomWordData.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultforOne;
