import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import word from './Random';

import gameBGImg from '../assets/icons/gameBGImg.png';
import trashImg from '../assets/icons/trashImg.png';
import nextImg from '../assets/icons/nextImg.png';
import checkImg from '../assets/icons/checkImg.png';

import '../GamePage.css';

const saveURL = 'http://localhost:5000/save';

const maxPlayer = 2; // 게임 시작 화면에서 설정한 플레이어 수
const randWord = 'word'; // 임시 랜덤 숫자(0~4)
const maxNum = 9999; // 좌표 기본값 1
const minNum = -1; // 좌표 기본값 2
let minX = maxNum; // 입력된 X의 최소값
let minY = maxNum; // 입력된 Y의 최소값
let maxX = minNum; // 입력된 X의 최대값
let maxY = minNum; // 입력된 Y의 최대값

// 게임 페이지
function GamePage() {
  const [currentPlayer, countPlayer] = useState(1); // 현재 플레이어 번호
  const [ctx, setCtx] = useState(); // 캔버스 데이터
  const [isDrawing, setIsDrawing] = useState(false); // 현재 그림을 그리고 있는가?

  const canvasRef = useRef(null); // setCanvas

  const canvasWidth = useRef(null); // 캔버스 넓이
  const canvasHeight = useRef(null); // 캔버스 높이

  const imgArray = new Array(maxPlayer); // 임시 단어 배열

  // x,y값 초기화
  function setXY() {
    minX = maxNum;
    minY = maxNum;
    maxX = minNum;
    maxY = minNum;
  }

  // 캔버스 초기 설정
  function setCanvas() {
    const canvas = canvasRef.current;
    const { width, height } = canvas.getBoundingClientRect();
    canvasWidth.current = width;
    canvasHeight.current = height;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 2.5;
    setCtx(context);
    setXY();
  }

  // 페이지 로드 시 1회 실행, 캔버스 기본 세팅
  useEffect(() => {
    setCanvas();
    window.addEventListener('resize', setCanvas);
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
        if (offsetX > maxX) maxX = offsetX;
        if (offsetX < minX) minX = offsetX;
        if (offsetY > maxY) maxY = offsetY;
        if (offsetY < minY) minY = offsetY;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  }

  // 캔버스 내용 지우기
  function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth.current, canvasHeight.current);
    setXY();
  }

  // 현재 캔버스에있는 그림을 이미지파일로 반환
  function convertCanvasToImage() {
    const image = new Image();

    const whiteRange = 10; // 여백의 크기

    let w = 0; // 그린 그림의 넓이
    let h = 0; // 그린 그림의 높이

    // 그림을 안그렸으면 기본 넓이 주기
    if (maxX === minNum) {
      maxX = 0;
      maxY = 0;
      minX = 0;
      minY = 0;
      w = 1;
      h = 1;
    }
    // 그렸으면 여백 조금 주고 좌표 수정
    else {
      if (maxX + whiteRange > canvasWidth) maxX = canvasWidth;
      else maxX += whiteRange;

      if (maxY + whiteRange > canvasHeight) maxY = canvasWidth;
      else maxY += whiteRange;

      if (minX - whiteRange < 0) minX = 0;
      else minX -= whiteRange;

      if (minY - whiteRange < 0) minY = 0;
      else minY -= whiteRange;

      w = maxX - minX;
      h = maxY - minY;
    }

    const imageData = ctx.getImageData(minX, minY, w, h); // 영역 내의 이미지 데이터 추출
    clearCanvas(); // 내용 지우기
    const imgMax = w > h ? w : h; // 가로나 세로중 큰 값 획득
    const center = Math.abs(w - h) / 2 + whiteRange; // 이미지의 실제 여백

    // 캔버스의 가로세로를 출력할 이미지에 맞게 변경
    canvasRef.current.width = imgMax + whiteRange * 2;
    canvasRef.current.height = imgMax + whiteRange * 2;

    // 가로가 길면 이미지를 세로 중앙에 배치, 반대는 반대로
    if (w > h) ctx.putImageData(imageData, whiteRange, center);
    else ctx.putImageData(imageData, center, whiteRange);

    image.src = canvasRef.current.toDataURL(); // 캔버스 이미지 URL저장
    console.log(image.src);
    setCanvas(); // 캔버스 리셋
    return image;
  }

  async function PostImage(image) {
    const response = await axios.post(saveURL, image);
    console.log(response);
  }

  // 다음 버튼 클릭 시 호출
  function NextButtonClick() {
    imgArray[currentPlayer - 1] = convertCanvasToImage(); // 추출한 이미지 배열에 이미지 저장
    // 현재 플레이어가 마지막 플레이어면 결과페이지로 이동및 imgArray 백엔드에 넘기기
    if (currentPlayer < maxPlayer) countPlayer(current => current + 1); // 마지막 플레이어가 아니면 다음 플레이어로
    else {
      for (let i = 0; i < imgArray.length; i += 1) {
        PostImage(imgArray[i]);
      }
    }
  }

  // Link태그 눌렀을때 마지막 플레이어가 아니면 페이지 이동 못하게하는 함수
  const testHandler = event => {
    if (currentPlayer < maxPlayer) event.preventDefault();
  };

  return (
    <div className="w-screen h-screen bg-primary relative">
      <img id="gameBGImg" src={gameBGImg} className="absolute w-screen h-screen px-[2vw] py-[2vh]" alt="" />
      <canvas
        id="drawingCanvas"
        ref={canvasRef}
        className="absolute w-[80%] h-[75%] left-[10%] top-[15%] border-2 border-black"
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseLeave={finishDrawing}
        onMouseUp={finishDrawing}
      />
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
        <button onClick={clearCanvas} className="mr-[3vmin]">
          <img src={trashImg} alt="" className="h-[7vmin] " />
        </button>
        <Link to="../resultone" onClick={testHandler}>
          <button onClick={NextButtonClick}>
            <img src={currentPlayer === maxPlayer ? checkImg : nextImg} alt="" className="h-[7vmin]" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default GamePage;
