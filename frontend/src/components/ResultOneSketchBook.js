import sketchbook from '../assets/icons/sketchbook.png';

import ResultText from './ResultText';
import ResultButtons from './ResultButtons';

function ResultOneSketchBook({ randomWordData, isPC, stateData }) {

  let text = ""
  if (randomWordData.value < 30) {
    text = `AI는 ${randomWordData.name}을 ${randomWordData.value}% 밖에 예측못했네요...`;
  } else if (value < 60) {
    text = `AI는 ${randomWordData.name}을 ${randomWordData.value}% 정도로 예측했네요.`;
  } else {
    text = `AI는 ${randomWordData.name}을 ${randomWordData.value}% 나, 예측했어요!`;
  }

  return (
    <div
      className="deskTop:w-[40vw] deskTop:h-[40vw] deskTop:max-w-[65vh] deskTop:max-h-[65vh]
      mobile:h-[30vh] deskTop:ml-[4vw] flex-col justify-center"
    >
      <div
        className="flex justify-center items-center relative 
        deskTop:h-[80%] mobile:h-[90%] mobile:mb-[-1vh]"
      >
        <img src={sketchbook} className="deskTop:h-[100%] mobile:h-[90%]" alt="" />
        <img
          src={randomWordData.imageUrl}
          alt=""
          className="absolute h-[50%] top-1/2 left-1/2
          -translate-y-[50%] -translate-x-[50%]"
        />
      </div>
      <ResultText name={randomWordData.name} value={randomWordData.value} textSize={10} />
      <div className="mt-[3vh]">{isPC && <ResultButtons isforOne stateData={stateData} resultString={text} img={randomWordData.imageUrl}/>}</div>
    </div>
  );
}
export default ResultOneSketchBook;
