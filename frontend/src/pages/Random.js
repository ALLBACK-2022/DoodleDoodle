import recreate from '../assets/icons/changeImg.png';
import play from '../assets/icons/startImg.png';
import ContentText from '../components/ContentText';
import IconButton from '../components/IconButton';
import TitleText from '../components/TitleText';

function Random() {
  return (
    <div className="m-0 w-screen h-screen bg-primary flex">
      <div className="m-auto flex flex-col items-center">
        <div className="self-center">
          <TitleText text="사과를 그려보세요!" />
        </div>

        <div className="flex mt-80">
          <div className="mr-64 flex flex-col items-center">
            <ContentText text="다른 거 그리고 싶어요" />
            <IconButton image={recreate} />
          </div>
          <div className="ml-64 flex flex-col items-center">
            <ContentText text="네!" />
            <IconButton image={play} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Random;
