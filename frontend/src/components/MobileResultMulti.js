// import ProgressBar from '@ramonak/react-progress-bar';

import { useNavigate } from 'react-router';

function MobileResultMulti({ percentage, rank, doodle, player, drawid, gameid }) {
  const navigate = useNavigate();
  const containerStyles = {
    height: '1.6rem',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '0 10px 10px 0',
    borderWidth: '1px',
    borderColor: 'black',
  };

  const fillerStyles = {
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: '#f8d359',
    borderRadius: 'inherit',
    textAlign: 'right',
    borderWidth: '1px',
    borderColor: 'black',
  };
  function onClick() {
    navigate('../resultone', {
      replace: true,
      state: { drawId: drawid, gameId: gameid, isFromGamePage: false },
    });
  }

  return (
    <div
      className="flex items-center mb-[2rem] 
    w-[100%] h-[7rem] place-content-center"
    >
      <div className="flex items-center">
        <div className="text-primary-3 font-cookierun_m text-[1.25rem] mr-[1rem]">{rank}</div>
        <div
          tabIndex={0}
          role="button"
          onClick={onClick}
          onKeyDown={onClick}
          className="sketchbook w-[6rem] h-[6rem] relative left-[0.2rem]"
        >
          <img
            src={doodle}
            alt=""
            className="absolute w-1/2 h-1/2 left-1/2 top-1/2 
          -translate-y-[50%] -translate-x-[50%]"
          />
        </div>

        <div className="flex flex-col h-[50%] justify-self-start">
          <div className="flex w-[100%] place-content-between ml-[0.3rem]">
            <div className="font-cookierun_m text-[1rem] mb-[0.25rem]">{`player${player}`}</div>
            <div className="text-primary-3 font-cookierun_m text-[1rem] mb-[0.25rem]">{percentage}%</div>
          </div>
          <div className="h-[1.0rem] w-[8rem]">
            <div style={containerStyles}>
              <div style={fillerStyles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileResultMulti;
