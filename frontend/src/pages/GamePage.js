import React, { useState, useRef, useEffect } from 'react';
import gameBGImg from '../assets/icons/gameBGImg.png';
import trashImg from '../assets/icons/trashImg.png';
import nextImg from '../assets/icons/nextImg.png';
import checkImg from '../assets/icons/checkImg.png';
import '../GamePage.css';

const maxPlayer = 2; // 게임 시작 화면에서 설정한 플레이어 수
const wordArray = ['사과', '바나나', '비행기', '새', '텔레비전']; // 임시 단어 배열
const randWord = wordArray[Math.floor(Math.random() * wordArray.length)]; // 임시 랜덤 숫자(0~4)

// 게임 페이지
function GamePage() {
  const [currentPlayer, countPlayer] = useState(1); // 현재 플레이어 번호
  const [ctx, setCtx] = useState(); // 캔버스 데이터
  const [isDrawing, setIsDrawing] = useState(false); // 현재 그림을 그리고 있는가?
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  // 페이지 로드 시 1회 실행, 캔버스 기본 세팅
  useEffect(function () {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 800;
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 2.5;
    contextRef.current = context;
    setCtx(context);
  }, []);

  // 그리기 시작하면 호출(마우스 누를때)
  function startDrawing() {
    setIsDrawing(true);
  }

  // 그리기가 끝나면 호출(마우스 떼거나 캔버스 밖으로 나갔을때)
  function finishDrawing() {
    setIsDrawing(false);
  }

  // 그리는 동안 호출(마우스 누르고 움직이는 동안)
  function drawing({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      if (!isDrawing) {
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  }

  // 캔버스 내용 지우기
  function clearCanvas() {
    ctx.clearRect(0, 0, 1000, 800);
  }

  // 다음 버튼 클릭 시 호출
  function NextButtonClick() {
    // 그림 저장해서 백엔드에 저장하기 추가 예정
    clearCanvas();
    // 현재 플레이어가 마지막 플레이어면 결과페이지로 이동
    if (currentPlayer + 1 > maxPlayer) {
      console.log('Go To Result Page'); // 결과페이지 이동 추가 예정
    } else countPlayer(current => current + 1); // 마지막 플레이어가 아니면 다음 플레이어로
  }

  return (
    <div className="flex w-full h-full bg-primary relative text-[4vw]">
      <img id="gameBGImg" src={gameBGImg} className="px-[2vw] py-[2vh] m-auto w-screen h-screen" alt="" />
      <canvas
        ref={canvasRef}
        id="drawingCanvas"
        className="w-[1000] h-[800] left-1/2 translate-x-[-50%] mt-[15vh] border-2 border-black absolute"
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
        onMouseUp={finishDrawing}
      />
      <span
        className="text-primary-3 font-cookierun
        absolute mt-[8vh] ml-[5.5vw] text-[2.5vw] translate-y-[-50%]"
      >
        {maxPlayer === 1 ? '' : ''.concat('플레이어 ', currentPlayer, '/', maxPlayer)}
      </span>
      <span
        className="text-grey font-cookierun
        absolute left-1/2 text-center translate-x-[-50%] translate-y-[-50%] mt-[8vh] text-[4vw]"
      >
        &lt;{randWord}&gt;
      </span>
      <span className="right-0 absolute mt-[8.7vh] mr-[5.5vw] translate-y-[-50%]">
        <button className="" onClick={clearCanvas}>
          <img src={trashImg} alt="" className="w-[3.2vw]" />
        </button>
        <button className="px-[2.5vw]" onClick={NextButtonClick}>
          <img src={currentPlayer === maxPlayer ? checkImg : nextImg} alt="" className="w-[3.2vw]" />
        </button>
      </span>
    </div>
  );
}

export default GamePage;
