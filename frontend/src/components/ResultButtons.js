import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import ShareResult from './ShareResult';

import home from '../assets/icons/mobile-home.png';
import back from '../assets/icons/mobile-back.png';
import restart from '../assets/icons/mobile-again.png';

const NumURL = 'http://localhost:5000/api/v1/games';
function ResultButtons({ isforOne, stateData, resultString, img }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });

  // 랜덤페이지로 이동
  async function goToRandomPage(count) {
    await axios.post(NumURL, { 'user-num': count }).then(response => {
      console.log(response.data);
      // 새로운 gameId 받아서 이동

      navigate('../random', { replace: true, state: { playerNum: count, gameID: response.data } });
    });
  }

  function onClick() {
    console.log(stateData);
    // 이전 페이지가 게임페이지면 랜덤페이지로 이동
    // 다인용 결과페이지에서 왔으면 다인용 결과페이지로 이동
    if (stateData.isFromGamePage) {
      // stateData.drawId.length 를 알수없으면 오류대신 undefined, ?? 왼쪽이 undefined면 오른쪽값으로
      goToRandomPage(stateData.drawId?.length ?? stateData.drawId);
    } else {
      navigate('../resultmany', {
        replace: true,
        state: { playerNum: stateData.drawId.length, gameID: stateData.gameId },
      });
    }
  }

  if (isMobile) {
    return (
      <div className="inline-flex flex-row w-[90%]  place-content-end gap-6">
        <div className="flex   space-y-[0.3rem]">
          <button onClick={onClick} className="h-[2.7rem] w-[2.7rem] ">
            <img className="h-[2.7rem] w-[2.7rem]" src={stateData.isFromGamePage ? restart : back} alt="" />
            {/* 다시하기 */}
          </button>
        </div>
        <Link to="/">
          <div className="flex  space-y-[0.3rem]">
            <button className="h-[2.7rem] w-[2.7rem] ">
              <img className="h-[2.7rem] w-[2.7rem]" src={home} alt="" />
            </button>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-row justify-center space-x-[5%]">
      <ShareResult isforOne={isforOne} resultString={resultString} img={img} />

      <button
        onClick={onClick}
        className={`font-cookierun deskTop:text-[2.5vmin] deskTop:w-[30%] mobile:text-lg deskTop:max-w-[15vh]
          py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:bg-primary' : 'bg-black text-primary'}`}
      >
        {stateData.isFromGamePage ? '다시하기' : '뒤로가기'}
      </button>
      <Link to="/" className="deskTop:w-[30%]">
        <button
          className={`font-cookierun deskTop:text-[2.5vmin] mobile:text-lg deskTop:max-w-[15vh]
          py-[0.3rem] rounded-full whitespace-nowrap deskTop:w-[100%] 
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:bg-primary' : 'bg-black text-primary'}`}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
}

export default ResultButtons;
