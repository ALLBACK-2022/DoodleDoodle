import { useNavigate } from 'react-router';

function ResultMulti({ percentage, rank, doodle, player, number, taskid, drawid, gameid }) {
  const navigate = useNavigate();

  function chagneRank2String(ranknum) {
    switch (ranknum) {
      case 1:
        return '1st';
      case 2:
        return '2nd';
      case 3:
        return '3rd';
      case 4:
      case 5:
      case 6:
        return ''.concat(ranknum, 'th');
      default:
        return '1st';
    }
  }
  const resultConfig = {
    2: 'flex flex-col w-[50%] h-[100%]',
    3: 'flex flex-col w-1/3 h-[100%]',
    4: 'flex flex-col w-[50%] h-[50%]',
    5: 'flex flex-col w-1/3 h-1/3',
    6: 'flex flex-col w-1/3 h-1/3',
  };
  function onClick() {
    navigate('../resultone', {
      replace: true,
      state: { taskId: taskid, drawId: drawid, gameId: gameid },
    });
  }

  return (
    <div className={`${resultConfig[number]}`}>
      <div className="flex flex-row place-content-around">
        <div className="font-cookierun text-4xl text-black"> {chagneRank2String(rank)} </div>
        <div className="font-cookierun text-2xl text-black "> {`player${player}`} </div>
        <div className="font-cookierun text-2xl text-white "> {percentage}% </div>
      </div>
      <div
        tabIndex={0}
        role="button"
        onClick={onClick}
        onKeyDown={onClick}
        className="object-contain h-full w-[80%] items-center self-center text-center relative sketchbook"
      >
        <img
          src={doodle}
          alt=""
          className="absolute w-1/2 h-1/2 left-1/2 top-1/2 
          -translate-y-[50%] -translate-x-[50%]"
        />
      </div>
    </div>
  );
}

export default ResultMulti;
