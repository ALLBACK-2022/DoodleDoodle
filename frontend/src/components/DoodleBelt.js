import doodle2 from '../assets/icons/mobiledoodle_2.png';
import doodle3 from '../assets/icons/mobiledoodle_3.png';
import doodle4 from '../assets/icons/mobiledoodle_4.png';
import doodle5 from '../assets/icons/mobiledoodle_5.png';
import doodle6 from '../assets/icons/mobiledoodle_6.png';

function Doodle({ doodle }) {
  return <img src={doodle.src} className="w-[12vw]" alt="" />;
}

function DoodleBelt({ isTop }) {
  // tailwind config / slider: 100%: transform: 'translateX(-(12 * 10 * 이미지 개수)vw)'
  // animation: slider: slider (애니메이션 반복 주기)s ~
  const doodlesTop = [
    { id: 1, src: doodle2 },
    { id: 2, src: doodle3 },
    { id: 3, src: doodle4 },
    { id: 4, src: doodle5 },
    { id: 5, src: doodle6 },
  ];

  const doodlesBottom = [
    { id: 1, src: doodle5 },
    { id: 2, src: doodle6 },
    { id: 3, src: doodle2 },
    { id: 4, src: doodle3 },
    { id: 5, src: doodle4 },
  ];

  if (isTop) {
    return (
      <div className="relative overflow-hidden">
        <div
          className="flex flex-row space-x-[10vw] w-[100%]
        my-[3vh] items-center animate-slider"
        >
          {doodlesTop.map(doodle => (
            <Doodle doodle={doodle} key={doodle.id} />
          ))}
          {doodlesTop.map(doodle => (
            <Doodle doodle={doodle} key={doodle.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex flex-row space-x-[10vw] w-[100%]
        my-[3vh] items-center animate-slider"
      >
        {doodlesBottom.map(doodle => (
          <Doodle doodle={doodle} key={doodle.id} />
        ))}
        {doodlesBottom.map(doodle => (
          <Doodle doodle={doodle} key={doodle.id} />
        ))}
      </div>
    </div>
  );
}

export default DoodleBelt;
