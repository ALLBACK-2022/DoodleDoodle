import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import home from '../assets/icons/mobile-home.png';
import back from '../assets/icons/mobile-back.png';
import restart from '../assets/icons/mobile-again.png';

// 다시하기, 홈으로 수정 필요

function MobileBottomBtn({ goback, playerNumber, gameId }) {
  const navigate = useNavigate();

  // 다시하기
  function onClick() {
    navigate('../random', {
      replace: true,
      state: { playerNum: playerNumber, gameID: gameId },
    });
  }

  if (goback) {
    return (
      <div className="flex w-[80%] items-center self-center place-content-center place-content-between">
        <div className="flex flex-col items-center  space-y-[0.3rem]">
          <button className="h-[3rem] w-[3rem] ml-[17rem]">
            <img className="h-[3rem] w-[3rem]" src={back} alt="" /> {/* 뒤로가기 */}
          </button>
        </div>
        <Link to="/">
          <div className="flex flex-col items-center space-y-[0.3rem]">
            <button className="h-[3rem] w-[3rem] ml-[2rem]">
              <img className="h-[3rem] w-[3rem]" src={home} alt="" />
            </button>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="inline-flex w-[80%] items-center self-center place-content-center place-content-between">
      <div className="flex flex-col items-center  space-y-[0.3rem]">
        <button onClick={onClick} className="h-[3rem] w-[3rem] ml-[17rem]">
          <img className="h-[3rem] w-[3rem]" src={restart} alt="" /> {/* 다시하기 */}
        </button>
      </div>
      <Link to="/">
        <div className="flex flex-col items-center space-y-[0.3rem]">
          <button className="h-[3rem] w-[3rem] ml-[2rem]">
            <img className="h-[3rem] w-[3rem]" src={home} alt="" />
          </button>
        </div>
      </Link>
    </div>
  );
}

export default MobileBottomBtn;
