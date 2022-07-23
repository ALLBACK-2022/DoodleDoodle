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
      mobile:w-[23vw] mobile:py-[1vh] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
    >
      결과저장
    </button>
  );
}

export default ShareResult;

import React, {useRef} from 'react';
import html2canvas from 'html2canvas';

function ShareResult({isforOne}){

    async function share() {

        const result = async (title, text, blob) => {

            const data = {
              files: [
                new File([blob], 'result.png', {
                  type: 'image/png',
                }),
              ],
              title: title,
              text: text,
            };

            try {
              if (!navigator.canShare || !(navigator.canShare(data))) {
                throw new Error("Can't share data.", data);
              }
              await navigator.share(data);
            } catch (err) {
              console.error(err.name, err.message);
            }
        };

        await html2canvas(document.getElementById("resultonepage")).then(async (canvas) => {
            await canvas.toBlob(function(blob) {
                result('reuslt', 'resultShare', blob)
            }, 'image/png');
        });
    }

    return (
            <button onClick={share}
                className={`font-cookierun lg:text-2xl sm:text-lg px-[1.5rem] py-[0.3rem] rounded-full whitespace-nowrap
                    ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
                >
                자랑하기
            </button>
    );
}

export default ShareResult;