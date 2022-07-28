import { Link } from 'react-router-dom';
import ShareResult from './ShareResult';

function ResultButtons({ isforOne }) {
  return (
    <div className="flex flex-row space-x-[10%] justify-center deskTop:mt-[4vh] mobile:w-[92vw]">
      <ShareResult isforOne={isforOne} />
      <Link to="/">
        <button
          className={`font-cookierun deskTop:text-[2vmin] mobile:text-[2vh]
          deskTop:w-[10vw] deskTop:py-[1vh] deskTop:max-w-[15vh]
          mobile:w-[23vw] mobile:py-[1vh] rounded-full whitespace-nowrap
          ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
        >
          다시하기
        </button>
      </Link>
      <Link to="/">
        <button
          className={`font-cookierun deskTop:text-[2vmin] mobile:text-[2vh]
          deskTop:w-[10vw] deskTop:py-[1vh] deskTop:max-w-[15vh]
          mobile:w-[23vw] mobile:py-[1vh] rounded-full whitespace-nowrap
          ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
}

export default ResultButtons;
