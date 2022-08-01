import React, { useEffect } from 'react';
import '../assets/icons/smile.png';

function ShareResult({ resultString, isforOne, img }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const array = resultString.split('을 ');
  const str = array[0].concat('을\n', array[1]);

  function shareButton() {
    if (window.Kakao) {
      const kakao = window.Kakao;

      kakao.init(process.env.REACT_APP_KAKAO_TOKEN);

      kakao.Link.sendCustom({
        templateId: 80689,
        templateArgs: {
          ARGS: str,
          THU: img,
        },
      });
    }
  }
  return (
    <button
      onClick={shareButton}
      className={`font-cookierun deskTop:text-[2.5vmin] deskTop:w-[30%] mobile:text-[2vh]
      deskTop:py-[0.3rem] deskTop:max-w-[15vh] rounded-full whitespace-nowrap
      mobile:w-[11vh] mobile:max-w-[23vw] mobile:py-[1vh]
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:bg-primary' : 'bg-black text-primary hover:bg-primary-2'}`}
    >
      저장하기
    </button>
  );
}
export default ShareResult;
