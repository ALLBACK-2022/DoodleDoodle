import React from 'react';
import { TailSpin } from 'react-loader-spinner';

// import React, { useEffect } from 'react';
// import lottie from 'lottie-web';
// import LoadingIcon from '../assets/icons/loadingIcon.json';

function Loading() {
  //   const container = document.querySelector('#container');
  //   useEffect(() => {
  //     lottie.loadAnimation({
  //       container,
  //       renderer: 'svg',
  //       loop: true,
  //       autoplay: true,
  //       animationData: LoadingIcon,
  //     });
  //   });

  return (
    <div className="absolute left-[50vw] top-[50vh] translate-x-[-50%] translate-y-[-50%]">
      <div className="inline-flex text-center flex-col justify-center items-center">
        {/* <div id="container" style={{ width: '200px', height: '200px' }} /> */}
        <TailSpin color="#ea580c" height={80} width={80} />
        <h2 className="item-center mt-[1rem] font-cookierun_m text-orange-600 deskTop:text-3xl mobile:text-xl">
          사진 분석 중
        </h2>
      </div>
    </div>
  );
}

export default Loading;
