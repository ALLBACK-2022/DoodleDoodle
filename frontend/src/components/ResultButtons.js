import { Link } from 'react-router-dom';
import ShareResult from './ShareResult';

function ResultButtons({ isforOne }) {
  return (
    <div className="flex flex-row justify-center">
      <ShareResult isforOne={isforOne} />

      <Link to="/" className="mx-[5%]">
        <button
          className={`font-cookierun deskTop:text-2xl  mobile:text-xl px-[1.5rem]  w-[9rem]
          py-[0.3rem] rounded-full whitespace-nowrap 
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:text-black' : 'bg-black text-primary hover:bg-primary-2'}`}
        >
          다시하기
        </button>
      </Link>
      <Link to="/">
        <button
          className={`font-cookierun deskTop:text-2xl mobile:text-xl px-[1.5rem] w-[9rem]
          py-[0.3rem] rounded-full whitespace-nowrap 
      ${isforOne ? 'bg-primary-3 text-primary-1 hover:text-black' : 'bg-black text-primary hover:bg-primary-2'}`}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
}

export default ResultButtons;
