import React from 'react';
import html2canvas from 'html2canvas';

function ShareResult({ isforOne }) {
  function download(dataurl, filename) {
    const link = document.createElement('a');
    link.href = dataurl;
    link.download = filename;
    link.click();
  }

  async function share() {
    await html2canvas(document.getElementById('resultonepage')).then(async canvas => {
      await canvas.toBlob(function (blob) {
        download(URL.createObjectURL(blob), 'result.png');
      }, 'image/png');
    });
  }

  return (
    <button
      onClick={share}
      className={`font-cookierun deskTop:text-[2vmin] mobile:text-[2vh]
      deskTop:w-[10vw] deskTop:py-[1vh] deskTop:max-w-[15vh]
      mobile:w-[11vh] mobile:max-w-[23vw] mobile:py-[1vh] rounded-full whitespace-nowrap
                ${
                  isforOne ? 'bg-primary-3 text-primary-1 hover:text-black' : 'bg-black text-primary hover:bg-primary-2'
                }`}
    >
      저장하기
    </button>
  );
}

export default ShareResult;
