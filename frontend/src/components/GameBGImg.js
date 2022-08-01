import '../GameBGImg.css';

function GameBGImg({ pageName }) {
  switch (pageName) {
    case 'GamePage':
      return (
        <div id="bgDiv" className="mobile:top-[17vh] mobile:relative">
          <img id="gameBGImg" className="absolute w-[100vw] mobile:h-[80vh]" alt="" />
        </div>
      );
    case 'ResultforOne':
      return (
        <div id="bgDiv" className="mobile:top-[3vh] mobile:relative">
          <img id="gameBGImg" className="absolute w-[100vw] mobile:h-[94vh]" alt="" />
        </div>
      );
    case 'ResultMany':
      return (
        <div id="bgDiv" className="mobile:top-[3vh] mobile:absolute mobile:w-[100vw]">
          <img id="resultManyBG" className="absolute w-[100vw] mobile:h-[94vh]" alt="" />
        </div>
      );
    default:
      console.log('Can not read id');
  }
}

export default GameBGImg;
