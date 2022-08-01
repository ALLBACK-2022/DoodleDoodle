import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
// import MobileBottomBtn from '../components/MobileBottomBtn';
import MobileResultMulti from '../components/MobileResultMulti';
import ResultButtons from '../components/ResultButtons';
import ResultMulti from '../components/ResultMulti';
import '../scrollbar.css';

const getInfoURL = 'http://localhost:5000/api/v1/draws/results/multi';
const getImageURL = 'http://localhost:5000/api/v1/results/game/';

function ResultMany() {
  const tempInfo = [];
  const tempPics = [];
  const [playersPics, setPlayersPics] = useState([]);
  const [playersInfo, setPlayersInfo] = useState([]);
  const [infoLoading, setInfoLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);
  const location = useLocation();

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width: 701px)',
  });

  async function getData() {
    console.log('getData() here');
    console.log('task-id from gamepage', location.state.taskId);
    await axios
      .post(getInfoURL, {
        'game-id': location.state.gameId,
        'task-id': location.state.taskId,
      })
      .then(response1 => {
        const response = response1.data.res;
        console.log(response);
        // eslint-disable-next-line no-unused-vars
        const temp = response.map(element => tempInfo.push(element));
        console.log('playersInfo length', tempInfo.length);
        // eslint-disable-next-line no-unused-vars
        const temp2 = tempInfo.map(player => {
          console.log('randword similarity', player.randword.similarity);
          console.log('draw-no', player['draw-no']);
          console.log('task-id', [player['task-id']]);
          console.log('draw-id', player['draw-id']);
          return player;
        });
        setPlayersInfo(tempInfo);
        setInfoLoading(loading => !loading);
        console.log('infoLoading', infoLoading);
      })
      .then();

    await axios.get(getImageURL.concat(location.state.gameId)).then(response2 => {
      const response = response2.data;
      console.log(response);
      // test
      // eslint-disable-next-line no-unused-vars
      const temp = location.state.taskId.map((element, index) => {
        tempPics.push(response[index + 1]);
        return null;
      });
      setPlayersPics(tempPics);
      setPicLoading(pics => !pics);
      console.log('PicLoading', picLoading);
      console.log(tempPics);
    });
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log('PicLoading', picLoading);
    console.log('infoLoading', infoLoading);
  }, [infoLoading, picLoading]);

  return (
    <div id="resultmanypage" className={`flex w-screen h-screen ${isMobile ? 'bg-primary' : 'bg-primary-1'}`}>
      <div id={`${isMobile ? 'mobileBGImg' : 'BGyellowImg'}`} className="px-[3rem] py-[2rem] w-full h-[100vh] ">
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
                doodle={playersPics[player['draw-no'] - 1]}
                player={player['draw-no']}
                key={player['draw-id']}
                taskid={[player['task-id']]}
                drawid={player['draw-id']}
              />
            ))}
          </div>
        )}
        {isPc && infoLoading && picLoading && (
          <div className="flex flex-wrap place-content-around w-[85%] h-[70%] justify-center m-auto">
            {playersInfo.map((player, index) => (
              <ResultMulti
                rank={index + 1}
                percentage={player.randword.similarity}
                doodle={playersPics[player['draw-no'] - 1]}
                player={player['draw-no']}
                key={player['draw-id']}
                number={playersInfo.length}
                taskid={[player['task-id']]}
                drawid={player['draw-id']}
                gameid={location.state.gameId}
              />
            ))}
          </div>
        )}
        {infoLoading && (
          <div className="mobile:text-center mobile:mt-[5%] deskTop:fixed deskTop:bottom-[4rem] deskTop:right-[5rem]">
            <ResultButtons isforOne={false} stateData={location.state} />
          </div>
        )}
      </div>
    </div>
  );
  /*
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
  */
}
export default ResultMany;
