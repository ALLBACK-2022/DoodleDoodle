import { Link, useNavigate } from 'react-router-dom';
import ShareResult from './ShareResult';

function ResultButtons({ isforOne, playerNumber, gameId }) {
  const navigate = useNavigate();
  function onClick() {
    navigate('../random', {
      replace: true,
      state: { playerNum: playerNumber, gameID: gameId },
    });
  }
  return (
    <div className="flex flex-row justify-center">
      <ShareResult isforOne={isforOne} />

      <button
        onClick={onClick}
        className={`font-cookierun deskTop:text-3xl mobile:text-lg px-[1.5rem] 
          py-[0.3rem] rounded-full whitespace-nowrap mx-[2rem]
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
      >
        다시하기
      </button>
      <Link to="/">
        <button
          className={`font-cookierun deskTop:text-3xl mobile:text-lg px-[1.5rem] 
          py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
}

export default ResultButtons;
