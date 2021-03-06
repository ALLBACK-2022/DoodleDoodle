import { Link } from 'react-router-dom';

function ResultButtons({ isforOne }) {
  return (
    <div className="flex flex-row justify-center">
      <button
        className={`font-cookierun lg:text-2xl sm:text-lg px-[1.5rem] py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
      >
        자랑하기
      </button>
      <Link to="/" className="mx-[5%]">
        <button
          className={`font-cookierun lg:text-2xl sm:text-lg px-[1.5rem] py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
        >
          다시하기
        </button>
      </Link>
      <Link to="/">
        <button
          className={`font-cookierun lg:text-2xl sm:text-lg px-[1.5rem] py-[0.3rem] rounded-full whitespace-nowrap
      ${isforOne ? 'bg-primary-3 text-primary-1' : 'bg-black text-primary'}`}
        >
          홈으로
        </button>
      </Link>
    </div>
  );
}

export default ResultButtons;
