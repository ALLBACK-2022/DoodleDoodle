import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // AI API없앨때 같이 없애기

import DrawingCanvas from '../components/DrawingCanvas';

import gameBGImg from '../assets/icons/gameBGImg.png';
import trashImg from '../assets/icons/trashImg.png';
import nextImg from '../assets/icons/nextImg.png';
import checkImg from '../assets/icons/checkImg.png';

import '../GamePage.css';

const postImageURL = 'http://localhost:5000/save'; // 백엔드에 이미지 보내는 API주소
// let taskIDArray = [];

// 게임 페이지
function GamePage() {
  const [randWord, setRandWord] = useState(''); // 그림을 그릴 단어
  const [maxPlayer, setMaxPlayer] = useState(); // 전체 플레이어 수
  const [currentPlayer, countPlayer] = useState(1); // 현재 플레이어 번호

  const location = useLocation(); // 이전 페이지에서 받아온 데이터

  const navigate = useNavigate(); // 네비게이트 선언(다음페이지 이동 시 사용할 함수

  const canvasRef = useRef(); // DrawingCanvas컴포넌트의 함수를 불러오기위한 ref

  const gameID = useRef(); // 게임 ID

  // 플레이어수, 게임ID, 단어를 이전 페이지에서 받아와서 업데이트
  function setGameData() {
    setRandWord(location.state.drawWord);
    setMaxPlayer(location.state.playerNum);
    gameID.current = location.state.gameID;
    // taskIDArray = new Array(maxPlayer);
  }

  // 페이지 로드 시 1회 실행, 게임 Data 세팅 및 캔버스 기본 세팅
  useEffect(() => {
    setGameData();
  }, []);

  // 이미지를 백엔드에 보내는 함수
  async function postImage(imgFile) {
    const formData = new FormData();
    formData.append('game-id', gameID);
    formData.append('draw-no', currentPlayer);
    formData.append('filename', imgFile);
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    fetch(postImageURL, requestOptions)
      .then(response => {
        console.log(response);
      })
      .catch(() => console.log('error'));
  }

  // 현재 캔버스에있는 그림을 이미지파일로 반환
  const imgDataPost = data => {
    // 파일객체 생성 및 백엔드에 저장
    const metadata = { type: 'image/png' };
    const file = new File([data], ''.concat(gameID, '_', currentPlayer, '.png'), metadata);
    postImage(file);
    if (currentPlayer < maxPlayer) countPlayer(current => current + 1); // 마지막 플레이어가 아니면 다음 플레이어로
    else navigate('../resultone', { replace: true, state: { gameId: gameID } });
  };

  function nextButtonClick() {
    console.log(maxPlayer);
    canvasRef.current.convertCanvasToImage();
  }

  function clearButtonClick() {
    canvasRef.current.clearCanvas();
  }

  return (
    <div className="w-screen h-screen bg-primary relative">
      <img id="gameBGImg" src={gameBGImg} className="absolute" alt="" />
      <DrawingCanvas ref={canvasRef} imgDataPost={imgDataPost} />
      <div
        className="text-primary-3 font-cookierun text-[4.5vmin]
        absolute h-[7vmin] left-[5.5%] top-[5.5%] flex items-center"
      >
        {maxPlayer === 1 ? '' : ''.concat('플레이어 ', currentPlayer, '/', maxPlayer)}
      </div>
      <div
        className="text-grey font-cookierun text-[7vmin]
        absolute h-[7vmin] top-[5.5%] left-[50%] translate-x-[-50%] flex items-center"
      >
        &lt;{randWord}&gt;
      </div>
      <div className="absolute right-[10%] top-[5.5%] h-[7vmin] flex items-center">
        <button onClick={clearButtonClick} className="mr-[3vmin]">
          <img src={trashImg} alt="" className="h-[7vmin] " />
        </button>
        <button onClick={nextButtonClick}>
          <img src={currentPlayer === maxPlayer ? checkImg : nextImg} alt="" className="h-[7vmin]" />
        </button>
      </div>
    </div>
  );
}

export default GamePage;
