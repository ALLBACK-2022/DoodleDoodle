import { Link } from 'react-router-dom';
import ShareResult from './ShareResult';

function ResultButtons({ isforOne }) {
  return (
<<<<<<< HEAD
<<<<<<< develop
    <div className="flex flex-row justify-center">
      <ShareResult isforOne={isforOne}/>
=======
=======
>>>>>>> backend-khl
    <div className="inline-flex flex-row justify-center">
      <button
        className={`font-cookierun deskTop:text-2xl mobile:text-lg px-[1.5rem] 
        py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
      >
        자랑하기
      </button>
>>>>>>> feat: result for multi UI complete
      <Link to="/" className="mx-[5%]">
        <button
          className={`font-cookierun deskTop:text-2xl mobile:text-lg px-[1.5rem] 
          py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
        >
          다시하기
        </button>
      </Link>
      <Link to="/">
        <button
          className={`font-cookierun deskTop:text-2xl mobile:text-lg px-[1.5rem] 
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