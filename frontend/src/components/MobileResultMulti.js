// import ProgressBar from '@ramonak/react-progress-bar';
import sketchbook from '../assets/icons/sketchbook.png';

function MobileResultMulti({ percentage, rank, doodle, player }) {
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

  return (
    <div
      className="inline-flex relative items-center px-[3rem] mb-[2rem] 
    w-[90%] h-[7rem] space-x-[1.5rem] place-content-center"
    >
      <div className="text-primary-3 font-cookierun_m text-[1.25rem] w-[2.5rem] h-[2.5rem]">{rank}</div>
      <div className="flex relative items-center">
        <div className="w-[8.75rem] h-[7rem] absolute">
          <img src={sketchbook} alt="" className="w-[100%] h-[100%] absolute" />
          <img
            src={doodle}
            alt=""
            className="absolute w-1/2 h-1/2 left-1/2 top-1/2 
          -translate-y-[50%] -translate-x-[50%]"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex w-[55%] place-content-end self-end place-content-between">
            <div className="font-cookierun_m text-[1rem] mb-[0.25rem]">{`player${player}`}</div>
            <div className="text-primary-3 font-cookierun_m text-[1rem] mb-[0.25rem]">{percentage}%</div>
          </div>
          <div className="h-[1.6rem] w-[12rem] ml-[8.5rem]">
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
