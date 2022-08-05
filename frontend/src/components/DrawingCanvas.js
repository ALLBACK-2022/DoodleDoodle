import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

const maxNum = 9999; // min 좌표 기본값
const minNum = -1; // max 좌표 기본값
let minX = maxNum; // 입력된 X의 최소값
let minY = maxNum; // 입력된 Y의 최소값
let maxX = minNum; // 입력된 X의 최대값
let maxY = minNum; // 입력된 Y의 최대값

function DrawingCanvas({ imgDataPost }, ref) {
  const [ctx, setCtx] = useState(); // 캔버스 context2d

  const isDrawing = useRef(false);

  const canvasRef = useRef(); // 캔버스 참조용
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
    if (canvasRef.current === null) {
      window.removeEventListener('resize', setCanvas);
      return;
    }
    const canvas = canvasRef.current; // 캔버스 가져오기
    const { width, height } = canvas.getBoundingClientRect(); // 캔버스 넓이, 높이 가져와서 할당
    canvasWidth.current = width;
    canvasHeight.current = height;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d'); // ctx할당
    context.strokeStyle = 'black'; // 붓 색깔 검은색
    context.lineWidth = window.innerWidth <= 700 ? 10 : 16; // 붓 굵이
    context.lineCap = 'round'; // 선 부드럽게 만들어줌
    context.lineJoin = 'round';
    setCtx(context); // 함수 밖 ctx 할당
    setXY(); // min max
  }

  // 페이지 로드 시 1회 실행, 캔버스 기본 세팅
  useEffect(() => {
    setCanvas();
    // 화면 크기 조정될때마다 크기에 맞춰 캔버스 재설정
    window.addEventListener('resize', setCanvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 그리는 동안 호출(마우스 누르고 움직이는 동안)
  function drawing(event) {
    let offsetX;
    let offsetY;
    if (event.type === 'touchstart' || event.type === 'touchmove') {
      offsetX = event.touches[0].clientX - event.target.offsetLeft;
      offsetY = event.touches[0].clientY - event.target.offsetTop + document.documentElement.scrollTop;
    } else {
      offsetX = event.clientX - ctx.canvas.offsetLeft;
      offsetY = event.clientY - ctx.canvas.offsetTop;
    }
    if (ctx) {
      if (!isDrawing.current) {
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

  // 그리기 시작하면 호출(마우스 누를때)
  function startDrawing(event) {
    drawing(event);
    isDrawing.current = true;
  }

  // 그리기가 끝나면 호출(마우스 떼거나 캔버스 밖으로 나갔을때)
  function finishDrawing() {
    isDrawing.current = false;
  }

  // 이미지 URL을 받아 Blob객체로 변환해주는 함수
  function imgURItoBlob(dataURI) {
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

  // 캔버스에 흰색배경과 이미지를 그린다
  function drawImageWithBG(image) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 캔버스를 흰색으로 채움
    ctx.drawImage(image, 0, 0); // img를 캔버스에 그리는 코드
  }

  // convertCanvasToImage에서 이미지 로딩이 끝나면 실행
  // 이미지에 배경을 넣은뒤 file객체로 변환 후 GamePage의 imgDataPost 실행
  function finishImageLoading(image) {
    drawImageWithBG(image);
    // // console.log(canvasRef.current.toDataURL()); // 그린 이미지 URL, 테스트할때만 사용 ㄱㄱ
    const data = imgURItoBlob(canvasRef.current.toDataURL()); // 이미지 URL을 Blob객체로 변환
    setCanvas();
    imgDataPost(data);
  }

  // 캔버스 내용 지우기, 전체지우기 버튼에서 사용해야됨
  function clearCanvas() {
    ctx.clearRect(0, 0, canvasWidth.current, canvasHeight.current);
    setXY(); // 그림을 지웠으므로 x,y도 초기화
  }

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
    image.addEventListener('load', () => {
      finishImageLoading(image);
    });

    image.src = canvasRef.current.toDataURL(); // 캔버스 이미지 URL저장
    clearCanvas();
  }

  // 부모 컴포넌트에서 아래 함수들을 참조할수있음
  useImperativeHandle(ref, () => ({
    // 캔버스 내용 지우기, 전체지우기 버튼에서 사용해야됨
    clearCanvas: () => clearCanvas(),

    // 현재 캔버스에있는 그림을 이미지파일로 반환, NextButton에서 실행해야됨
    convertCanvasToImage: () => convertCanvasToImage(),
  }));

  return (
    <canvas
      id="drawingCanvas"
      ref={canvasRef}
      className="absolute deskTop:w-[80%] deskTop:h-[75%] deskTop:left-[10%] deskTop:top-[15%]
        mobile:w-[100%] mobile:h-[72%] mobile:top-[20%] touch-none"
      onMouseDown={startDrawing}
      onMouseMove={drawing}
      onMouseLeave={finishDrawing}
      onMouseUp={finishDrawing}
      onTouchStart={startDrawing}
      onTouchMove={drawing}
      onTouchEnd={finishDrawing}
    />
  );
}

export default forwardRef(DrawingCanvas);
