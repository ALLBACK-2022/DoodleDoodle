import doodle1 from '../assets/icons/mobiledoodle_13.png';
import doodle2 from '../assets/icons/mobiledoodle_6.png';
import doodle3 from '../assets/icons/mobiledoodle_7.png';
import doodle4 from '../assets/icons/mobiledoodle_8.png';
import doodle5 from '../assets/icons/mobiledoodle_9.png';
import doodle6 from '../assets/icons/mobiledoodle_10.png';
import doodle7 from '../assets/icons/mobiledoodle_11.png';
import doodle8 from '../assets/icons/mobiledoodle_12.png';
import doodle9 from '../assets/icons/mobiledoodle_14.png';

function Doodle({ doodle }) {
  return <img src={doodle.src} className="w-[13vw]" alt="" />;
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
    { id: 9, src: doodle9 },
  ];

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex flex-row space-x-[10vw] w-[100%]
       h-100 m-[3rem] animate-slider items-center"
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

  // const doodlesTop = [
  //   { id: 1, src: doodle1 },
  //   { id: 2, src: doodle2 },
  //   { id: 3, src: doodle3 },
  //   { id: 4, src: doodle4 },
  //   { id: 5, src: doodle5 },
  //   { id: 6, src: doodle6 },
  //   { id: 7, src: doodle7 },
  //   { id: 8, src: doodle8 },
  //   { id: 9, src: doodle9 },
  // ];

  // const doodlesBottom = [
  //   { id: 1, src: doodle9 },
  //   { id: 2, src: doodle1 },
  //   { id: 3, src: doodle2 },
  //   { id: 4, src: doodle3 },
  //   { id: 5, src: doodle4 },
  //   { id: 6, src: doodle5 },
  //   { id: 7, src: doodle6 },
  //   { id: 8, src: doodle7 },
  //   { id: 9, src: doodle8 },
  // ];

  // if (isMainPage) {
  //   return (
  //     <div className="relative overflow-hidden">
  //       <div
  //         className="flex flex-row space-x-[10vw] w-[100%]
  //       my-[3vh] items-center animate-slider"
  //       >
  //         {doodles.map(doodle => (
  //           <Doodle doodle={doodle} key={doodle.id} />
  //         ))}
  //         {doodles.map(doodle => (
  //           <Doodle doodle={doodle} key={doodle.id} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  // if (isTop) {
  //   return (
  //     <div className="relative overflow-hidden">
  //       <div
  //         className="flex flex-row space-x-[10vw] w-[100%]
  //         h-100% m-[3rem] animate-slider items-center"
  //       >
  //         {doodlesTop.map(doodle => (
  //           <Doodle doodle={doodle} key={doodle.id} />
  //         ))}
  //         {/* {doodles.map(doodle => (
  //         <Doodle doodle={doodle} key={doodle.id} />
  //       ))} */}
  //       </div>
  //     </div>
  //   );
  // }
  // return (
  //   <div className="flex flex-row space-x-[10vw] w-[100%] mb-[3vh] items-center animate-slider">
  //     {doodlesBottom.map(doodle => (
  //       <Doodle doole={doodle} key={doodle.id} />
  //     ))}
  //   </div>
  // );
}

export default DoodleBelt;
