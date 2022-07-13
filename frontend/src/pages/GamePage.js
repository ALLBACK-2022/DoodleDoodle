import React, { useState /* , useRef, useEffect */ } from 'react';
import gameBGImg from '../assets/icons/gameBGImg.png';
import trashImg from '../assets/icons/trashImg.png';
import nextImg from '../assets/icons/nextImg.png';
import checkImg from '../assets/icons/checkImg.png';

const maxPlayer = 6;
const wordArray = ['사과', '바나나', '비행기', '새', '텔레비전'];
const randWord = wordArray[Math.floor(Math.random() * wordArray.length)];
// const nextButtonImg = maxPlayer === 1 ? checkImg : nextImg;

function Canvas() {
  /* const [ctx, setCtx] = useState();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const array = [];
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 2.5;
    contextRef.current = context;
    setCtx(context.current);
  }, []);
  console.log(ctx);
  const canvasEventListener = (event, type) => {
    const x = event.clientX - event.target.offsetLeft;
    const y = event.clientY - event.target.offsetTop;
    if (type === 'move') {
      if (array.length === 0) {
        array.push({ x, y });
      } else {
        ctx.save(); // 다른 스타일 또는 속성을 줄 수 있으므로 항상 save를 합니다.
        ctx.beginPath();
        ctx.moveTo(array[array.length - 1].x, array[array.length - 1].y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore(); // 작업이 끝나면 기존 스타일 또는 속성으로 되돌려 줍니다.
        array.push({ x, y });
      }
    } else if (type === 'leave') {
      ctx.save();
      while (array.length) array.pop();
      ctx.clearRect(0, 0, 2580, 2580);
      ctx.restore();
    }
  }; */
  return (
    <canvas
      // ref={canvasRef}
      id="drawingCanvas"
      className="w-[85%] h-[75%] left-1/2 
    translate-x-[-50%] mt-[15vh] border-2 border-black absolute"
      /* onMouseDown={event => {
        canvasEventListener(event, 'down');
      }}
      onMouseMove={event => {
        canvasEventListener(event, 'move');
      }}
      onMouseLeave={event => {
        canvasEventListener(event, 'leave');
      }}
      onMouseUp={event => {
        canvasEventListener(event, 'up');
      }} */
    />
  );
}

function GamePage() {
  const [currentPlayer, countPlayer] = useState(1);
  function NextButtonClick() {
    if (currentPlayer + 1 > maxPlayer) {
      console.log('Go To Result Page');
    } else countPlayer(current => current + 1);
  }
  return (
    <div className="flex w-full h-full bg-primary relative text-[4vw]">
      <img src={gameBGImg} className="px-[2vw] py-[2vh] m-auto w-screen h-screen" alt="" />
      <Canvas />
      <span
        className="text-primary-3 font-cookierun blur-none
        drop-shadow-xl absolute mt-[8vh] ml-[5.5vw] text-[2.5vw] translate-y-[-50%]"
      >
        {maxPlayer === 1 ? '' : ''.concat('플레이어 ', currentPlayer, '/', maxPlayer)}
      </span>
      <span
        className="text-grey font-cookierun blur-none
        drop-shadow-xl absolute left-1/2 text-center translate-x-[-50%] translate-y-[-50%] mt-[8vh] text-[4vw]"
      >
        &lt;{randWord}&gt;
      </span>
      <span className="right-0 absolute mt-[8.7vh] mr-[5.5vw] translate-y-[-50%]">
        <button className="">
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
