// import ResultText from '../components/ResultText';
import { useMediaQuery } from 'react-responsive';
import MobileBottomBtn from '../components/MobileBottomBtn';
import MobileResultMulti from '../components/MobileResultMulti';
import ResultButtons from '../components/ResultButtons';
import ResultMulti from '../components/ResultMulti';
import '../scrollbar.css';

function ResultMany() {
  // 이게 백엔드에서 받아오는 값
  const players = [
    { id: 1, url: 'https://cdn.icon-icons.com/icons2/1919/PNG/512/lightbulbon_121975.png', percentage: 80 },
    { id: 2, url: 'https://cdn.icon-icons.com/icons2/1919/PNG/512/lightbulbon_121975.png', percentage: 60 },
    { id: 3, url: 'https://cdn.icon-icons.com/icons2/1919/PNG/512/lightbulbon_121975.png', percentage: 60 },
    { id: 4, url: 'https://cdn.icon-icons.com/icons2/1919/PNG/512/lightbulbon_121975.png', percentage: 60 },
  ];

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width: 701px)',
  });
  return (
    <div className={`flex w-screen h-screen ${isMobile ? 'bg-primary' : 'bg-primary-1'}`}>
      <div
        id={`${isMobile ? 'mobileBGImg' : 'BGyellowImg'}`}
        className="px-[3rem] py-[2rem] w-full h-[100vh] overflow-y-auto"
      >
        <h1
          className="text-black font-cookierun text-left
        deskTop:text-5xl mobile:text-2xl my-[4rem] deskTop:ml-[5rem] mobile:text-center mobile:my-[2rem]"
        >
          누가 더 똑같이 그렸을까요?
        </h1>
        {isMobile && (
          <div
            className="scrollSection h-[25rem] 
      py-[2rem] px-[0.8rem] overflow-y-auto text-center m-auto mb-[1.5rem]"
          >
            {players.map(player => (
              <MobileResultMulti
                rank={player.id}
                percentage={player.percentage}
                doodle={player.url}
                player={player.id}
                key={player.id}
              />
            ))}
          </div>
        )}
        {isPc && (
          <div className="flex flex-wrap place-content-around w-[85%] justify-center m-auto">
            {players.map(player => (
              <ResultMulti
                rank={player.id}
                percentage={player.percentage}
                doodle={player.url}
                player={player.id}
                key={player.id}
                number={players.length}
              />
            ))}
          </div>
        )}
        {isMobile && (
          <div className="text-center mt-[5%]">
            <MobileBottomBtn goback={false} />
          </div>
        )}
        {isPc && (
          <div className="fixed bottom-[4rem] right-[5rem]">
            <ResultButtons isforOne={false} />
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultMany;
