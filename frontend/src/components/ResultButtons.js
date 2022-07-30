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
    <div className="flex flex-row deskTop:my-[2rem] justify-center">
      <ShareResult isforOne={isforOne} />

      <button
        onClick={onClick}
        className={`font-cookierun deskTop:text-2xl deskTop:w-[9rem] mobile:text-lg px-[1.5rem] 
          py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:bg-primary' : 'bg-black text-primary'}`}
      >
        다시하기
      </button>
      <Link to="/">
        <button
          className={`font-cookierun deskTop:text-2xl deskTop:w-[9rem] mobile:text-lg px-[1.5rem] 
          py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:bg-primary' : 'bg-black text-primary'}`}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
}

export default ResultButtons;
