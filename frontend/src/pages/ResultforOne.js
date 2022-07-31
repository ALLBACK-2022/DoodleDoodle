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
  const [imageUrl, setImageUrl] = useState([testImage,]); // 유사도 상위 5개의 이미지들
  const [isRender, setIsRender] = useState([0, 0, 0, 0, 0]); // API호출 성공시 이미지 업데이트하기위한 인덱스배열

  const location = useLocation();

  // drawId로 이미지 URL가져오는 함수
  async function getRandomWordImage(drawId) {
    const response = await axios.get(getImageURL.concat(drawId));
    console.log(getImageURL.concat(drawId));
    // console.log(response);
    return response.data;
  }

  // 백엔드에서 API 불러오는 함수
  async function getResult() {
    await axios.post(baseURL, {
      'game-id': location.state.gameId,
      'draw-id': location.state.drawId,
      'task-id': location.state.taskId,
    }).then((response) => {
      const topfiveArray = [];
      const imageArray = [];

      const top = response.data.topfive;
      for(let i = 0; i < 5; i += 1){
        if(typeof top[i] != 'undefined'){
          console.log(top[i]);
          topfiveArray.push({
            name: top[i].dictionary.name,
            value: top[i].similarity,
          });
          imageArray.push(top[i].dictionary.img_url);
        }
        else{
          console.log("topfive Error");
        }
      }

      console.log(imageArray);
      console.log(topfiveArray);
      setImageUrl(imageArray);
      setChart(topfiveArray);
      if(typeof response.data.ranword != 'undefined'){
        setRandomWordData({
          name: response.data.randword.dictionary.name,
          value: response.data.randword.similarity,
          imageUrl: getRandomWordImage(location.state.drawId),
        });
        console.log(response.data.randword.similarity);
      }
      else{
        console.log("randword Error");
      }
      if(imageArray.length == 5 && topfiveArray.length == 5){
        setTimeout(() => console.log("sleep"), 3000);
        setIsRender([0, 1, 2, 3, 4]);
      }
    })
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
          {isMobile && (
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
                    chartValue={chart[isRender[element]].value}
                    imageUrl={imageUrl[isRender[element]]}
                    chartName={chart[isRender[element]].name}
                  />
                ))}
              </div>

              <div className="flex flex-row mt-[4vh] space-x-[3vw] justify-center">
                {[3, 4].map(element => (
                  <TopFiveResult
                    key={element}
                    isPc={false}
                    rank={element}
                    chartValue={chart[isRender[element]].value}
                    imageUrl={imageUrl[isRender[element]]}
                    chartName={chart[isRender[element]].name}
                  />
                ))}
              </div>
            </div>
          )}
          {isPC && (
            <div
              className="relative justify-center top-[2vh]
            max-w-[60vh] max-h-[60vh] w-[40vw] h-[40vw]"
            >
              {[0, 1, 2, 3, 4].map(element => (
                <TopFiveResult
                  key={element}
                  isPc={isPC}
                  rank={element}
                  chartValue={chart[isRender[element]].value}
                  imageUrl={imageUrl[isRender[element]]}
                  chartName={chart[isRender[element]].name}
                />
              ))}
            </div>
          )}
          <ResultOneSketchBook randomWordData={randomWordData} isPC={isPC} />
        </div>
        <div className="absolute text-center bottom-[9vh] items-center w-[92vw]">
          {isMobile && <MobileBottomBtn isforOne />}
        </div>
      </div>
    </div>
  );
}
export default ResultforOne;
