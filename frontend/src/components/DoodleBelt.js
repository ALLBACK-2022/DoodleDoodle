import doodle1 from '../assets/icons/mobiledoodle_1.png';
import doodle2 from '../assets/icons/mobiledoodle_2.png';
import doodle3 from '../assets/icons/mobiledoodle_3.png';
import doodle4 from '../assets/icons/mobiledoodle_4.png';
import doodle5 from '../assets/icons/mobiledoodle_5.png';
import doodle6 from '../assets/icons/mobiledoodle_6.png';
import doodle7 from '../assets/icons/mobiledoodle_7.png';
import doodle8 from '../assets/icons/mobiledoodle_8.png';

function Doodle({ doodle }) {
  return <img src={doodle.src} className="w-[10vw]" alt="" />;
}

function DoodleBelt() {
  const doodles = [
    { id: 1, src: doodle1 },
    { id: 2, src: doodle2 },
    { id: 3, src: doodle3 },
    { id: 4, src: doodle4 },
    { id: 5, src: doodle5 },
    { id: 6, src: doodle6 },
    { id: 7, src: doodle7 },
    { id: 8, src: doodle8 },
  ];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex flex-row space-x-[10vw] w-[100%]
          h-100% m-[3rem] animate-slider items-center"
      >
        {doodles.map(doodle => (
          <Doodle doodle={doodle} key={doodle.id} />
        ))}
        {doodles.map(doodle => (
          <Doodle doodle={doodle} key={doodle.id} />
        ))}
      </div>
    </div>
  );

  // 애니메이션 미적용 코드(prop으로 isTop추가)
  /*
  const doodlesTop = [
    {
      id: 1,
      src: doodle1,
    },
    { id: 2, src: doodle2 },
    { id: 3, src: doodle3 },
    { id: 4, src: doodle4 },
  ];

  const doodlesBottom = [
    {
      id: 1,
      src: doodle5,
    },
    { id: 2, src: doodle6 },
    { id: 3, src: doodle7 },
    { id: 4, src: doodle8 },
  ];

  if(isTop){
    return (
    <div className="flex flex-row h-100% place-content-around mt-[3rem]">
      {doodlesTop.map(doodle => (
        <Doodle doodle={doodle} key={doodle.id} />
      ))}
    </div>
    );
  }
  return (
    <div className="flex flex-row h-100% place-content-around mb-[3rem]">
      {doodlesBottom.map(doodle => (
        <Doodle doodle={doodle} key={doodle.id} />
      ))}
    </div>
  );
  */
}

export default DoodleBelt;
