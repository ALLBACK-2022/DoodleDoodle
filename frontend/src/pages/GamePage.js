import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loading from '../components/loading';
import DrawingCanvas from '../components/DrawingCanvas';
import NextButton from '../components/NextButton';
import ClearButton from '../components/ClearButton';
import WordText from '../components/WordText';
import PlayerText from '../components/PlayerText';
import GameBGImg from '../components/GameBGImg';

const postImageURL = 'http://localhost:5000/api/v1/draws'; // 백엔드에 이미지 보내는 API주소

// 게임 페이지
function GamePage() {
  const [randWord, setRandWord] = useState(''); // 그림을 그릴 단어
  const [maxPlayer, setMaxPlayer] = useState(); // 전체 플레이어 수
  const [currentPlayer, countPlayer] = useState(1); // 현재 플레이어 번호
  const [isLoad, setIsLoad] = useState(false);

  const location = useLocation(); // 이전 페이지에서 받아온 데이터
  const navigate = useNavigate(); // 네비게이트 선언(다음페이지 이동 시 사용할 함수

  const canvasRef = useRef(); // DrawingCanvas컴포넌트의 함수를 불러오기위한 ref
  const gameID = useRef(); // 게임 ID

  const taskIdArray = useRef([]);
  const drawIdArray = useRef([]);

  // 플레이어수, 게임ID, 단어를 이전 페이지에서 받아와서 업데이트
  function setGameData() {
    setRandWord(location.state.drawWord);
    setMaxPlayer(location.state.playerNum);
    gameID.current = location.state.gameID;
    taskIdArray.current.length = 0;
    drawIdArray.current.length = 0;
  }

  // 페이지 로드 시 1회 실행, 게임 Data 세팅 및 캔버스 기본 세팅
  useEffect(() => {
    setGameData();
  }, []);

  // 이미지를 백엔드에 보내는 함수
  async function postImage(imgFile) {
    const formData = new FormData();
    formData.append('game-id', gameID.current);
    formData.append('draw-no', currentPlayer);
    formData.append('filename', imgFile);
    await axios
      .post(postImageURL, formData)
      .then(response => {
        taskIdArray.current[currentPlayer - 1] = response.data.task_id; // 반환값에서 TaskID받아서 저장
        drawIdArray.current[currentPlayer - 1] = response.data.draw_id; // 반환값에서 drawID받아서 저장
        // taskIdArray.push(response.data.task_id);
        // drawIdArray.push(response.data.draw_id);
        console.log('drawIdArray: ', drawIdArray.current);
        console.log('taskIdArray: ', taskIdArray.current);
        console.log('response: ', response);
        if (currentPlayer >= maxPlayer) {
          const newURL = maxPlayer === 1 ? '../resultone' : '../resultmany';
          console.log('goToResultPage');
          navigate(newURL, {
            replace: true,
            state: {
              gameId: gameID.current,
              taskId: taskIdArray.current,
              drawId: drawIdArray.current,
              isFromGamePage: true,
            },
          });
        }
      })
      .catch(error => {
        console.log(error);
        if (currentPlayer >= maxPlayer) {
          const newURL = maxPlayer === 1 ? '../resultone' : '../resultmany';
          navigate(newURL, {
            replace: true,
            state: {
              gameId: gameID.current,
              taskId: taskIdArray.current,
              drawId: taskIdArray.current,
              isFromGamePage: true,
            },
          });
        }
      });
  }

  // DrawingCanvas에서 이미지 로딩 완료후 호출
  // imageData를 받아서 파일객체 생성후 백엔드로 Post
  // 마지막 플레이어면 1인 or 다인용 결과페이지로 이동(state로 id들 전달)
  const imgDataPost = data => {
    // 파일객체 생성 및 백엔드에 저장
    // 로딩 구현 위치
    // <Loading />;
    const metadata = { type: 'image/png' };
    const file = new File([data], ''.concat(gameID, '_', currentPlayer, '.png'), metadata);
    postImage(file);
    if (currentPlayer < maxPlayer) countPlayer(current => current + 1); // 마지막 플레이어가 아니면 다음 플레이어로
  };

  // NextButton을 클릭했을때 실행
  const nextButtonClick = () => {
    if (isLoad === true) {
      return;
    }
    if (currentPlayer >= maxPlayer) {
      setIsLoad(true);
    }
    canvasRef.current.convertCanvasToImage();
  };

  // ClearButton을 클릭했을때 실행
  const clearButtonClick = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div className="w-screen h-screen bg-primary relative select-none">
      <GameBGImg isGamePage />
      <DrawingCanvas ref={canvasRef} imgDataPost={imgDataPost} />
      <PlayerText currentPlayer={currentPlayer} maxPlayer={maxPlayer} />
      <WordText randWord={randWord} />
      <ClearButton clearButtonClick={clearButtonClick} />
      <NextButton nextButtonClick={nextButtonClick} isMaxPlayer={currentPlayer >= maxPlayer} />
      <div>{isLoad && <Loading />}</div>
    </div>
  );
}

export default GamePage;
