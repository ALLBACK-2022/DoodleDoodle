import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router';
import GameBGImg from '../components/GameBGImg';
import MobileResultMulti from '../components/MobileResultMulti';
import ResultButtons from '../components/ResultButtons';
import ResultMulti from '../components/ResultMulti';
import '../scrollbar.css';

const getInfoURL = 'http://localhost:8080/api/v1/results/game/';

function ResultMany() {
  const [playersInfo, setPlayersInfo] = useState([]);
  const [randword, setRandword] = useState('');
  const [infoLoading, setInfoLoading] = useState(false);
  const location = useLocation();
  const gameId = useRef(-1);

  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width: 701px)',
  });

  // storage의 값이 null일 때 sessionstorage에 저장, null이 아니면 sessionStorage에서 값 끌어오기
  function setGameid() {
    const storageGameId = sessionStorage.getItem('gameId');
    if (!storageGameId) {
      window.sessionStorage.setItem('gameId', location.state.gameId);
      gameId.current = location.state.gameId;
      console.log('get location.state id');
    } else {
      gameId.current = Number(storageGameId);
      console.log('get storage id');
    }
  }

  function setResultString(drawno, word, similarity) {
    if (similarity < 30) {
      return `AI는 player${drawno}의 ${word}을 ${similarity}% 밖에 예측못했네요...`;
    }
    if (similarity < 60) {
      return `AI는 player${drawno}의 ${word}을 ${similarity}% 정도로 예측했네요.`;
    }
    return `AI는 player${drawno}의 ${word}을 ${similarity}% 나, 예측했어요!`;
  }

  async function getData() {
    const heders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    };

    console.log('getData() here');
    await axios.get(getInfoURL + gameId.current.toString(), heders).then(response => {
      console.log(response);
      setRandword(response.data.randword);
      setPlayersInfo(response.data.users);
      console.log(playersInfo);
      console.log(randword);
      // eslint-disable-next-line no-unused-vars
      // const temp2 = response.data.users.map(player => {
      //   console.log('draw-no', player.draw_no);
      //   console.log('draw-id', player['draw-id']);
      //   console.log('img_url', player.img_url);
      //   console.log('img_url', player.similarity);
      //   return player;
      // });
      setInfoLoading(loading => !loading);
    });
  }
  useEffect(() => {
    console.log('setGameid');
    setGameid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  useEffect(() => {
    console.log('infoLoading', infoLoading);
  }, [infoLoading]);

  return (
    <div id="resultmanypage" className={`relative flex w-screen h-screen ${isMobile ? 'bg-primary' : 'bg-primary-1'}`}>
      <GameBGImg pageName="ResultMany" />
      <div
        className="deskTop:py-[2rem] mobile:pt-[7vh] w-full h-[100vh] absolute overflow-y-auto scrollSection
      "
      >
        <h1
          className="text-black font-cookierun text-left
          deskTop:text-5xl mobile:text-[6.5vw] my-[4rem] deskTop:ml-[4rem] mobile:text-center mobile:my-[2rem]"
        >
          누가 더 똑같이 그렸을까요?
        </h1>
        {isMobile && infoLoading && (
          <div
            className="scrollSection deskTop:h-[25rem] mobile:h-[50vh] 
            deskTop:py-[2rem] px-[0.8rem] overflow-y-auto text-center m-auto mb-[1.5rem]"
          >
            {playersInfo.map((player, index) => (
              <MobileResultMulti
                rank={index + 1}
                percentage={player.similarity}
                doodle={player.img_url}
                player={player.draw_no}
                key={player['draw-id']}
                drawid={player['draw-id']}
              />
            ))}
          </div>
        )}
        {isPc && infoLoading && (
          <div
            className="flex flex-wrap place-content-around w-[85%] 
          justify-center m-auto"
          >
            {playersInfo.map((player, index) => (
              <ResultMulti
                rank={index + 1}
                percentage={player.similarity}
                doodle={player.img_url}
                player={player.draw_no}
                key={player['draw-id']}
                number={playersInfo.length}
                drawid={player['draw-id']}
              />
            ))}
          </div>
        )}
        {infoLoading && (
          <div
            className="mobile:absolute mobile:text-center mobile:bottom-[5vh] mobile:mx-auto
            mobile:items-center mobile:w-[75vw] deskTop:w-[40vw] deskTop:max-w-[65vh]
            deskTop:fixed deskTop:bottom-[6vh] deskTop:right-[8vw]"
          >
            <ResultButtons
              isforOne={false}
              isFromGamePage
              userNum={playersInfo.length}
              img={playersInfo[0].img_url}
              resultString={setResultString(playersInfo[0].draw_no, randword, playersInfo[0].similarity)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default ResultMany;
