import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
import MobileBottomBtn from '../components/MobileBottomBtn';
import MobileResultMulti from '../components/MobileResultMulti';
import ResultButtons from '../components/ResultButtons';
import ResultMulti from '../components/ResultMulti';
import '../scrollbar.css';

const getnfoURL = 'http://localhost:5000/api/v1/draws/results/multi';
const getImageURL = 'http://localhost:5000/api/v1/results/game/';

function ResultMany() {
  const [playersInfo, setPlayersInfo] = useState([{}]);
  const [playersPics, setPlayersPics] = useState([]);
  const [infoLoading, setInfoLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const location = useLocation();
  async function getData() {
    console.log('getData() here');

    const response1 = await axios
      .post(getnfoURL, {
        'game-id': location.state.gameId,
        'task-id': location.state.taskId,
      })
      .then(setInfoLoading(true));
    setPlayersInfo(response1.data.res);
    console.log('playersInfo');
    console.log(playersInfo);

    const response2 = await axios.get(getImageURL.concat(location.state.gameId)).then(setPicLoading(true));
    setPlayersPics(response2.data);
    console.log('playersPics');
    console.log(playersPics);
  }
  useEffect(() => {
    getData();
    console.log('useEffect() here');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width: 701px)',
  });

  return (
    <div id="resultmanypage" className={`flex w-screen h-screen ${isMobile ? 'bg-primary' : 'bg-primary-1'}`}>
      <div
        id={`${isMobile ? 'mobileBGImg' : 'BGyellowImg'}`}
        className="px-[3rem] py-[2rem] w-full h-[100vh] overflow-y-auto scrollSection"
      >
        <h1
          className="text-black font-cookierun text-left
        deskTop:text-5xl mobile:text-3xl my-[4rem] deskTop:ml-[4rem] mobile:text-center mobile:my-[2rem]"
        >
          누가 더 똑같이 그렸을까요?
        </h1>
        {isMobile && infoLoading && picLoading && (
          <div
            className="scrollSection h-[25rem] 
      py-[2rem] px-[0.8rem] overflow-y-auto text-center m-auto mb-[1.5rem]"
          >
            {playersInfo.map((player, index) => (
              <MobileResultMulti
                rank={index + 1}
                percentage={player.randword.similarity}
                doodle={playersPics[player['draw-no']]}
                player={player['draw-no']}
                key={player['draw-id']}
                taskid={[player['task-id']]}
                drawid={player['draw-id']}
              />
            ))}
          </div>
        )}
        {isPc && infoLoading && picLoading && (
          <div className="flex flex-wrap place-content-around w-[85%] justify-center m-auto">
            {playersInfo.map((player, index) => (
              <ResultMulti
                rank={index + 1}
                percentage={player.randword.similarity}
                doodle={playersPics[player['draw-no']]}
                player={player['draw-no']}
                key={player['draw-id']}
                number={playersInfo.length}
                taskid={[player['task-id']]}
                drawid={player['draw-id']}
              />
            ))}
          </div>
        )}
        {isMobile && infoLoading && (
          <div className="text-center mt-[5%]">
            <MobileBottomBtn goback={false} playerNumber={playersInfo.length} gameId={location.state.gameId} />
          </div>
        )}
        {isPc && infoLoading && (
          <div className="fixed bottom-[4rem] right-[5rem]">
            <ResultButtons isforOne={false} playerNumber={playersInfo.length} gameId={location.state.gameId} />
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultMany;
