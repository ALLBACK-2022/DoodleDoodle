import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios'; // AI API없앨때 같이 없애기

import gameBGImg from '../assets/icons/gameBGImg.png';
import trashImg from '../assets/icons/trashImg.png';
import nextImg from '../assets/icons/nextImg.png';
import checkImg from '../assets/icons/checkImg.png';

import '../GamePage.css';

const postImageURL = 'http://127.0.0.1:5000/save'; // 백엔드에 이미지 보내는 API주소
// const getAIURL = 'http://127.0.0.1:5001/AI?ranword=umbrella'; // AI에게 결과값 요청하는 API주소(임시)

const maxNum = 9999; // min 좌표 기본값
const minNum = -1; // max 좌표 기본값
let minX = maxNum; // 입력된 X의 최소값
let minY = maxNum; // 입력된 Y의 최소값
let maxX = minNum; // 입력된 X의 최대값
let maxY = minNum; // 입력된 Y의 최대값
// let taskIDArray = [];

// 게임 페이지
function GamePage() {
  const [maxPlayer, setMaxPlayer] = useState(); // 전체 플레이어 수
  const [currentPlayer, countPlayer] = useState(1); // 현재 플레이어 번호
  const [randWord, setRandWord] = useState(''); // 그림을 그릴 단어
  const [gameID, setGameID] = useState(''); // 게임 ID
  const [ctx, setCtx] = useState(); // 캔버스 context2d
  const [isDrawing, setIsDrawing] = useState(false); // 현재 그림을 그리고 있는가?

  const location = useLocation(); // 이전 페이지에서 받아온 데이터

  const navigate = useNavigate(); // 네비게이트 선언(다음페이지 이동 시 사용할 함수

  const canvasRef = useRef(null); // 캔버스 참조용
  const canvasWidth = useRef(null); // 캔버스 넓이
  const canvasHeight = useRef(null); // 캔버스 높이

  // x,y값 초기화
  function setXY() {
    minX = maxNum;
    minY = maxNum;
    maxX = minNum;
    maxY = minNum;
  }

  // 캔버스 초기 설정
  function setCanvas() {
    // 캔버스 가져오기
    const canvas = canvasRef.current;

    // 캔버스 넓이, 높이 가져와서 할당
    const { width, height } = canvas.getBoundingClientRect();
    canvasWidth.current = width;
    canvasHeight.current = height;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d'); // ctx할당
    context.strokeStyle = 'black'; // 붓 색깔 검은색
    context.lineWidth = 14; // 붓 굵이
    setCtx(context); // 함수 밖 ctx 할당
    setXY(); // min max
  }

  // 플레이어수, 게임ID, 단어를 이전 페이지에서 받아와서 업데이트
  function setGameData() {
    setRandWord(location.state.drawWord);
    setGameID(location.state.gameID);
    setMaxPlayer(location.state.playerNum);
    // taskIDArray = new Array(maxPlayer.current);
    console.log('gameID: ', location.state.gameID);
  }

  // 페이지 로드 시 1회 실행, 게임 Data 세팅 및 캔버스 기본 세팅
  useEffect(() => {
    setGameData();
    setCanvas();

    // 화면 크기 조정될때마다 크기에 맞춰 캔버스 재설정
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
        // 그리는 중이아니면 시작점만 변경
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
      } else {
        // 마우스 입력값 받아서 x,y 최소값, 최대값 업데이트
        if (offsetX > maxX) maxX = offsetX;
        if (offsetX < minX) minX = offsetX;
        if (offsetY > maxY) maxY = offsetY;
        if (offsetY < minY) minY = offsetY;

        // 그리는 중이면 마우스 위치에 stroke
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
      }
    }
  }

  // 캔버스 내용 지우기
  function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth.current, canvasHeight.current);
    setXY(); // 그림을 지웠으므로 x,y도 초기화
  }

  /*
  // AI API호출, 임시, 수많은 오류 생겨서 못쓸듯
  async function getAIData() {
    const postdata = JSON.stringify({
      'game-id': 71,
      'draw-no': 1,
    });
    const config = {
      method: 'post',
      url: 'http://127.0.0.1:5001/AI?ranword=umbrella',
      headers: {
        'Content-Type': 'application/json',
      },
      data: postdata,
    };

    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  } */

  // 이미지 URL을 받아 Blob객체로 변환해주는 함수
  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  // 이미지를 백엔드에 보내는 함수
  async function postImage(img) {
    const formData = new FormData();
    formData.append('game-id', gameID);
    formData.append('draw-no', currentPlayer);
    formData.append('filename', img);
    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    fetch(postImageURL, requestOptions)
      .then(response => {
        console.log(response);
        // getAIData(); AI API호출용, 못쓸듯
      })
      .catch(() => console.log('error'));
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

    // 이미지 로딩이 완료되면 이미지에 배경을 넣어서 파일객체로 변환후 POST
    image.addEventListener('load', function makeBGAndPost() {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 캔버스를 흰색으로 채움
      ctx.drawImage(image, 0, 0); // img를 캔버스에 그리는 코드
      const data = dataURItoBlob(canvasRef.current.toDataURL()); // 이미지 URL을 Blob객체로 변환

      // 파일객체 생성 및 백엔드에 저장
      const metadata = { type: 'image/png' };
      const file = new File([data], ''.concat(gameID, '_', currentPlayer, '.png'), metadata);
      postImage(file);
      if (currentPlayer >= maxPlayer) navigate('../resultone', { replace: true, state: { gameId: gameID } });
      setCanvas();
    });

    image.src = canvasRef.current.toDataURL(); // 캔버스 이미지 URL저장
    clearCanvas();
  }

  // 다음 버튼 클릭 시 호출
  function NextButtonClick() {
    convertCanvasToImage(); // 캔버스 이미지를 백엔드에 저장
    if (currentPlayer < maxPlayer) countPlayer(current => current + 1); // 마지막 플레이어가 아니면 다음 플레이어로
  }

  return (
    <div className="w-screen h-screen bg-primary relative">
      <img id="gameBGImg" src={gameBGImg} className="absolute w-screen h-screen px-[2vw] py-[2vh]" alt="" />
      <canvas
        id="drawingCanvas"
        ref={canvasRef}
        className="absolute w-[80%] h-[75%] left-[10%] top-[15%]"
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
        <button onClick={NextButtonClick}>
          <img src={currentPlayer === maxPlayer ? checkImg : nextImg} alt="" className="h-[7vmin]" />
        </button>
      </div>
    </div>
  );
}

export default GamePage;
