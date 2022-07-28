import '../GameBGImg.css';

function GameBGImg() {
  return (
    <div id="bgDiv" className="mobile:top-[17vh] mobile:relative">
      <img id="gameBGImg" className="absolute w-[100vw]" alt="" />
    </div>
  );
}

export default GameBGImg;
