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
    if (isforOne) {
      await html2canvas(document.getElementById('resultonepage')).then(async canvas => {
        await canvas.toBlob(function (blob) {
          download(URL.createObjectURL(blob), 'result.png');
        }, 'image/png');
      });
    } else {
      await html2canvas(document.getElementById('resultmanypage')).then(async canvas => {
        await canvas.toBlob(function (blob) {
          download(URL.createObjectURL(blob), 'result.png');
        }, 'image/png');
      });
    }
  }

  return (
    <button
      onClick={share}
<<<<<<< develop
<<<<<<< develop
<<<<<<< develop
      className={`font-cookierun deskTop:text-2xl deskTop:w-[9rem] mobile:text-[2vh]
      deskTop:px-[1.5rem] deskTop:py-[0.3rem] deskTop:max-w-[15vh] rounded-full whitespace-nowrap
      mobile:w-[11vh] mobile:max-w-[23vw] mobile:py-[1vh] rounded-full whitespace-nowrap
                 ${
                   isforOne
                     ? 'bg-primary-3 text-primary-1 hover:bg-primary'
                     : 'bg-black text-primary hover:bg-primary-2'
                 }`}
=======
=======
>>>>>>> feat: add celery_taskmeta table in models.py, fix restart button
=======
>>>>>>> feat: add celery_taskmeta table in models.py, fix restart button
      className={`font-cookierun deskTop:text-3xl mobile:text-lg px-[1.5rem] py-[0.3rem] rounded-full 
                whitespace-nowrap ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
>>>>>>> feat: add celery_taskmeta table in models.py, fix restart button
    >
      저장하기
    </button>
  );
}

export default ShareResult;
