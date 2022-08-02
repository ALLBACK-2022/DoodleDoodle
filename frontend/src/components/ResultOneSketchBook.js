import sketchbook from '../assets/icons/sketchbook.png';

import ResultText from './ResultText';
import ResultButtons from './ResultButtons';

function ResultOneSketchBook({ randomWordData, isPC, isFromGamePage, text }) {
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
      <ResultText textSize={10} text={text} />
      <div className="mt-[3vh]">
        {isPC && (
          <ResultButtons
            isforOne
            resultString={text}
            img={randomWordData.imageUrl}
            userNum={1}
            isFromGamePage={isFromGamePage}
          />
        )}
      </div>
    </div>
  );
}
export default ResultOneSketchBook;
