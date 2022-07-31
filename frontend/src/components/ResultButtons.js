import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import ShareResult from './ShareResult';

// const NumURL = 'http://localhost:5000/api/v1/games';

function ResultButtons({ isforOne, stateData }) {
  const navigate = useNavigate();

  // 랜덤페이지로 이동
  /* async function goToRandomPage(count) {
    await axios.post(NumURL, { 'user-num': count }).then(response => {
      console.log(response.data);
      // 새로운 gameId 받아서 이동
      navigate('../random', { replace: true, state: { playerNum: count, gameID: response.data } });
    });
  } */

  function onClick() {
    console.log(stateData);
    // 이전 페이지가 게임페이지면 랜덤페이지로 이동
    // 다인용 결과페이지에서 왔으면 다인용 결과페이지로 이동
    /* if (stateData.isFromGamePage) {
      goToRandomPage(stateData.drawId.length);
    } else { */
    navigate('../resultmany', {
      replace: true,
      state: { playerNum: stateData.drawId.length, gameID: stateData.gameId },
    });
    // }
  }
  return (
    <div className="flex flex-row justify-center space-x-[5%]">
      <ShareResult isforOne={isforOne} />

      <button
        onClick={onClick}
        className={`font-cookierun deskTop:text-[2.5vmin] deskTop:w-[30%] mobile:text-lg deskTop:max-w-[15vh]
          py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:bg-primary' : 'bg-black text-primary'}`}
      >
        {/* stateData.isFromGamePage ? '다시하기' : */ '다시하기'}
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
