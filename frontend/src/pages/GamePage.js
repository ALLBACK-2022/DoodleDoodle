import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import DrawingCanvas from '../components/DrawingCanvas';
import NextButton from '../components/NextButton';
import ClearButton from '../components/ClearButton';
import WordText from '../components/WordText';
import PlayerText from '../components/PlayerText';
import GameBGImg from '../components/GameBGImg';
import Loading from '../components/Loading';

const postImageToBackURL = 'http://localhost:5000/api/v1/draws'; // 백엔드에 이미지 보내는 API
const postImageToAIURL = 'http://localhost:8081/api/v1/ai/pictures'; // AI에 이미지 보내는 API
const getAITaskStatusURL = 'http://localhost:8081/api/v1/task_status'; // AI에게 Taskid로 상태확인
const getAIResultURL = 'http://localhost:8081/api/v1/result_predict'; // AI에게 Taskid로 분석결과 받기
const postResultToBackURL = 'http://localhost:5000/api/v1/game-result'; // 백엔드에 AI결과값 보내는 API

// 게임 페이지
function GamePage() {
  const [randWord, setRandWord] = useState(''); // 그림을 그릴 단어
  const [engRandWord, setEngRandWord] = useState(''); // 그림을 그릴 단어(영어)
  const [maxPlayer, setMaxPlayer] = useState(); // 전체 플레이어 수
  const [currentPlayer, countPlayer] = useState(1); // 현재 플레이어 번호
  const [isLoad, setIsLoad] = useState(false);

  const location = useLocation(); // 이전 페이지에서 받아온 데이터
  const navigate = useNavigate(); // 네비게이트 선언(다음페이지 이동 시 사용할 함수

  const canvasRef = useRef(); // DrawingCanvas컴포넌트의 함수를 불러오기위한 ref
  const gameID = useRef(); // 게임 ID
  const successCount = useRef(0);

  const drawIdArray = useRef([]);

  // 플레이어수, 게임ID, 단어를 이전 페이지에서 받아와서 업데이트
  function setGameData() {
    setRandWord(location.state.drawWord);
    setEngRandWord(location.state.engDrawWord);
    setMaxPlayer(location.state.playerNum);
    gameID.current = location.state.gameID;
    drawIdArray.current.length = 0;
    successCount.current = 0;
  }

  // 페이지 로드 시 1회 실행, 게임 Data 세팅 및 캔버스 기본 세팅
  useEffect(() => {
    setGameData();
  }, []);

  async function postImageToBack(imgFile) {
    const formData = new FormData();
    formData.append('game-id', gameID.current);
    formData.append('draw-no', currentPlayer);
    formData.append('filename', imgFile);
    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };
    await axios
      .post(postImageToBackURL, formData, heders)
      .then(response => {
        drawIdArray.current[currentPlayer - 1] = response.data.draw_id; // 반환값에서 drawID받아서 저장
        console.log('player', currentPlayer, '-drawId: ', drawIdArray.current[currentPlayer - 1]);
      })
      .catch(error => console.log(error));
  }

  function goToNextPage() {
    console.log('try go to next page testcount:', successCount.current, maxPlayer);
    if (successCount.current >= maxPlayer) {
      const newURL = maxPlayer === 1 ? '../resultone' : '../resultmany';
      console.log('goToResultPage');
      navigate(newURL, {
        replace: true,
        state: {
          gameId: gameID.current,
          drawId: drawIdArray.current,
          isFromGamePage: true,
        },
      });
    } else {
      setTimeout(function () {
        goToNextPage();
      }, 500);
    }
  }

  // AI에게 받은 결과를 백엔드로 전달
  async function postResultToBack(topFiveArray, randWordData) {
    console.log('player', currentPlayer, ': ', randWordData, topFiveArray);
    console.log(drawIdArray.current[currentPlayer - 1]);
    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/json; charset=UTF-8',
    };
    const request = {
      'draw-id': drawIdArray.current[currentPlayer - 1],
      'top-five': topFiveArray,
      randword: randWordData,
    };
    await axios
      .post(postResultToBackURL, request, heders)
      .then(response => {
        console.log('result', currentPlayer, ': ', response);
        successCount.current += 1;
        // 여기서 마지막 플레이어면 결과페이지 이동
        if (currentPlayer >= maxPlayer) {
          goToNextPage();
        } else console.log('DRAW COMPLETE');
        // 근데 만약 비동기로 처리하는 postImageToBack 이 안끝났는데 이거호출하면..?
      })
      .catch(error => {
        console.log('error in getAIResult: ', error);
      });
  }

  // TaskId로 AI상태 체크하기
  // 상태가 SUCCESS 면 AI에 결과값 요청하기
  let statusCheckCount = 0;
  let statusErrorCount = 0;
  const errorLimit = 5;
  const requestLimit = 10;
  const requestInterval = 500; // 0.25s

  async function getAIResult(taskId) {
    console.log('AI Task Complete: '.concat((statusCheckCount * requestInterval) / 1000, 's'));
    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/json; charset=UTF-8',
    };
    await axios
      .post(getAIResultURL, { task_id: taskId }, heders)
      .then(response => {
        console.log('player', currentPlayer, ': ', response);
        const resData = response.data;
        console.log(resData);
        const topFiveArray = [];
        const randWordData = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key in resData) {
          if (key !== 'result') {
            console.log(key, ': ', resData[key]);
            const data = {};
            data[key] = resData[key];
            topFiveArray.push(data);
          } else {
            randWordData[key] = resData[key];
          }
        }
        console.log('topfive: ', topFiveArray);
        console.log('topfive: ', randWordData);
        // 이미지에 분석 결과 보내기(response가공하던 뭐던해서)
        postResultToBack(topFiveArray, randWordData);
      })
      .catch(error => {
        console.log('error in getAIResult: ', error);
      });
  }

  async function checkAIStatus(taskId) {
    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/json; charset=UTF-8',
    };
    await axios
      .post(getAITaskStatusURL, { task_id: taskId }, heders)
      .then(response => {
        statusCheckCount += 1;
        console.log('checkAIStatus-', statusCheckCount, ': ', response);
        // 상태가 SUCCESS 면 AI에 결과값 요청하기
        if (response.data.status === 'SUCCESS') getAIResult(taskId);
        // 상태가 SUCCESS가 아니고 아직 요청 제한횟수 이하면 0.25초 뒤 다시 호출
        else if (statusCheckCount <= requestLimit)
          setTimeout(function () {
            checkAIStatus(taskId);
          }, requestInterval);
        else console.log('*요청카운트가 요청 제한횟수 이상입니다*');
      })
      .catch(error => {
        statusErrorCount += 1;
        console.log('checkAIStatusError-', statusErrorCount, ': ', error);
        // 에러카운트가 에러 제한횟수 이상이되면 호출 중지
        if (statusErrorCount < errorLimit) setTimeout(checkAIStatus(taskId), requestInterval);
        else console.log('*에러카운트가 에러 제한횟수 이상입니다*');
      });
  }

  // AI에 그린 이미지 보내고 TaskId받기
  async function postImageToAI(imgFile) {
    const formData = new FormData();
    formData.append('filename', imgFile);
    formData.append('randword', engRandWord);
    console.log(engRandWord);
    console.log(formData);
    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };
    await axios
      .post(postImageToAIURL, formData, heders)
      .then(response => {
        // response에서 taskId 받아서 AI에 폴링하기
        console.log('postImageToAI: ', response);
        checkAIStatus(response.data.task_id);
      })
      .catch(error => {
        console.log(engRandWord, imgFile);
        console.log('postImageToAIError:', error);
      });
  }

  // DrawingCanvas에서 이미지 로딩 완료후 호출
  // imageData를 받아서 파일객체 생성후 AI와 Backend에 Post
  // 마지막 플레이어면 1인 or 다인용 결과페이지로 이동(state로 id들 전달)
  const imgDataPost = data => {
    // 파일객체 생성 및 백엔드에 저장
    const metadata = { type: 'image/png' };
    const file = new File([data], ''.concat(gameID, '_', currentPlayer, '.png'), metadata);
    postImageToBack(file);
    postImageToAI(file);
    if (currentPlayer < maxPlayer) countPlayer(current => current + 1); // 마지막 플레이어가 아니면 다음 플레이어로
  };

  // NextButton을 클릭했을때 실행
  const nextButtonClick = () => {
    if (!isLoad) {
      if (currentPlayer >= maxPlayer) {
        setIsLoad(true);
        console.log('d');
      }
      canvasRef.current.convertCanvasToImage();
    } else console.log('loding...');
  };

  // ClearButton을 클릭했을때 실행
  const clearButtonClick = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div className="w-screen h-screen bg-primary relative select-none">
      <GameBGImg pageName="GamePage" />
      {isLoad && <Loading />}
      <DrawingCanvas ref={canvasRef} imgDataPost={imgDataPost} />
      <PlayerText currentPlayer={currentPlayer} maxPlayer={maxPlayer} />
      <WordText randWord={randWord} />
      <ClearButton clearButtonClick={clearButtonClick} />
      <NextButton nextButtonClick={nextButtonClick} isMaxPlayer={currentPlayer >= maxPlayer} />
    </div>
  );
}

export default GamePage;
