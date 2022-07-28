import '../GameBGImg.css';

function GameBGImg({ isGamePage }) {
  if (!isGamePage) {
    return (
      <div id="bgDiv" className="mobile:top-[3vh] mobile:relative">
        <img id="gameBGImg" className="absolute w-[100vw] mobile:h-[94vh]" alt="" />
      </div>
    );
  }
  return (
    <div id="bgDiv" className="mobile:top-[17vh] mobile:relative">
      <img id="gameBGImg" className="absolute w-[100vw] mobile:h-[80vh]" alt="" />
    </div>
  );
}

export default GameBGImg;
