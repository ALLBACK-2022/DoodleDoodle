// import ResultText from '../components/ResultText';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
import MobileBottomBtn from '../components/MobileBottomBtn';
import MobileResultMulti from '../components/MobileResultMulti';
import ResultButtons from '../components/ResultButtons';
import ResultMulti from '../components/ResultMulti';
import '../scrollbar.css';

function ResultMany() {
  const [gameData, setGameData] = useState({ game_id: 0, task_ids: [] });
  const [playersInfo, setPlayersInfo] = useState([{}]);
  const [playersPics, setPlayersPics] = useState([]);
  const location = useLocation();
  async function getData() {
    console.log('getData() here');
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    setGameData(prevGameData => ({ ...gameData, game_id: location.state.gameId, task_ids: location.state.taskId }));
    try {
      const response = await axios.post('http://localhost:5000/api/v1/draws/results/multi', {
        'game-id': gameData.game_id,
        'task-id': gameData.task_ids,
      });
      setPlayersInfo(response.data.res);
      console.log('playersInfo');
      console.log(playersInfo);
    } catch (err) {
      console.log('Error >>', err);
    }
    try {
      const response = await axios.get(`{http://localhost:5000/api/v1/results/game/${gameData.game_id}}`);
      setPlayersPics(response.data);
      console.log('playersPics');
      console.log(playersPics);
    } catch (err) {
      console.log('Error >>', err);
    }
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
        {isMobile && (
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
        {isPc && (
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
        {isMobile && (
          <div className="text-center mt-[5%]">
            <MobileBottomBtn goback={false} playerNumber={playersInfo.length} gameId={9} />
          </div>
        )}
        {isPc && (
          <div className="fixed bottom-[4rem] right-[5rem]">
            <ResultButtons isforOne={false} playerNumber={playersInfo.length} gameId={9} />
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultMany;
