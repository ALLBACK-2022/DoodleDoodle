import React, { useEffect, useRef } from 'react';
import '../assets/icons/smile.png';
import share from '../assets/icons/share.png';

function ShareResult({ resultString, isforOne, img, isMobile }) {
  const isShare = useRef(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  function shareButton() {
    if (window.Kakao) {
      console.log('shareB.img: ', img);
      const array = resultString.split('을 ');
      const str = array[0].concat('을\n', array[1]);
      console.log(isShare.current);
      const kakao = window.Kakao;
      if (!isShare.current) {
        kakao.init(process.env.REACT_APP_KAKAO_TOKEN);
        isShare.current = true;
      }

      kakao.Link.sendCustom({
        templateId: 80689,
        templateArgs: {
          ARGS: str,
          THU: img,
        },
      });
    }
  }
  if (isMobile) {
    return (
      <button onClick={shareButton} className="h-[6vh] w-[6vh] max-h-[10vw] max-w-[10vw]">
        <img className="h-[6vh] w-[6vh] max-h-[10vw] max-w-[10vw]" src={share} alt="" />
        {/* 모바일 공유하기 버튼 */}
      </button>
    );
  }
  return (
    <button
      onClick={shareButton}
      className={`font-cookierun deskTop:text-[2.5vmin] deskTop:w-[30%] mobile:text-[2vh]
      deskTop:py-[0.3rem] deskTop:max-w-[15vh] rounded-full whitespace-nowrap
      mobile:w-[11vh] mobile:max-w-[23vw] mobile:py-[1vh]
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:bg-primary' : 'bg-black text-primary hover:bg-primary-2'}`}
    >
      자랑하기
    </button>
  );
}
export default ShareResult;
