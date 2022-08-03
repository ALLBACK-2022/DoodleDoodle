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

  return (
    <div className="absolute deskTop:pl-[40rem] deskTop:pt-[20rem] mobile:pl-[10rem] mobile:pt-[25rem]">
      <div className="flex-row">
        <TailSpin color="#ea580c" height={80} width={80} />
        <h2 className="item-center mt-[2rem] font-cookierun_m text-orange-600 deskTop:text-3xl mobile:text-xl">
          사진 분석 중
        </h2>
      </div>

      {/* <div id="container" style={{ width: '200px', height: '200px' }} /> */}
    </div>
  );
}

export default Loading;
