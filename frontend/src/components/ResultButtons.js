import { Link } from 'react-router-dom';
import ShareResult from './ShareResult';

function ResultButtons({ isforOne }) {
  return (
    <div className="flex flex-row space-x-[5%] justify-center deskTop:mt-[4vh]">
      <ShareResult isforOne={isforOne} />
      <Link to="/">
        <button
          mobile:w-[11vh] mobile:max-w-[23vw] mobile:py-[1vh] rounded-full whitespace-nowrap
          deskTop:w-[10vw] deskTop:py-[1vh] deskTop:max-w-[15vh]
          className={`font-cookierun deskTop:text-[2vmin] mobile:text-[2vh]
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:text-black' : 'bg-black text-primary hover:bg-primary-2'}`}
        >
          다시하기
        </button>
      </Link>
      <Link to="/">
        <button
          mobile:w-[11vh] mobile:max-w-[23vw] mobile:py-[1vh] rounded-full whitespace-nowrap
          deskTop:w-[10vw] deskTop:py-[1vh] deskTop:max-w-[15vh]
          className={`font-cookierun deskTop:text-[2vmin] mobile:text-[2vh]
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:text-black' : 'bg-black text-primary hover:bg-primary-2'}`}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
}

export default ResultButtons;
