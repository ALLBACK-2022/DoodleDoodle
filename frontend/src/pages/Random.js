import recreate from '../assets/icons/changeImg.png';
import play from '../assets/icons/startImg.png';
import IconButton from '../components/IconButton';

function Random() {
  return (
    <div className="m-0 w-screen h-screen bg-primary flex">
      <div className="m-auto flex flex-col items-center">
        <div className="self-center">
          <h1
            className="w-54.5 h-8.5 text-7xl font-black text-primary-1 font-cookierun blur-none
      drop-shadow-xl shadow-black"
          >
            사과를 그려보세요!
          </h1>
        </div>

        <div className="flex mt-80">
          <div className="mr-64 flex flex-col items-center">
            <div className="mb-6 text-5xl font-black text-primary-1 font-cookierun">다른 거 그리고 싶어요</div>
            <IconButton image={recreate} className="w-6.25 h-6.553" />
          </div>
          <div className="ml-64 flex flex-col items-center">
            <div className="mb-6 text-5xl font-black text-primary-1 font-cookierun">네!</div>
            <IconButton image={play} className="w-6.25 h-6.553" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Random;
