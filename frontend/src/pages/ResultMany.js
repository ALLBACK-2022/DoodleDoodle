import BGyellowImg from '../assets/icons/BGyellowImg.png';
import ResultText from '../components/ResultText';

function ResultMany() {
  return (
    <div className="flex m-0 w-screen h-screen relative bg-primary-1">
      <img src={BGyellowImg} className="px-[2vw] py-[2vh] w-screen h-screen" alt="" />;
      <div clasName="flex">
        <ResultText text="AI는 무엇으로 예측했을까요?" />;
      </div>
    </div>
  );
}

export default ResultMany;
