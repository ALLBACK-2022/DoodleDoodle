// import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';

// import home from '../assets/icons/mobile-home.png';
// import back from '../assets/icons/mobile-back.png';
// import restart from '../assets/icons/mobile-again.png';

// // 다시하기, 홈으로 수정 필요

// function MobileBottomBtn({ goback, playerNumber, gameId }) {
//   const navigate = useNavigate();

//   // 다시하기
//   function onClick() {
//     navigate('../random', {
//       replace: true,
//       state: { playerNum: playerNumber, gameID: gameId },
//     });
//   }

//   if (goback) {
//     return (
//       <div className="inline-flex flex-row w-[90%]  place-content-end gap-6">
//         <div className="flex   space-y-[0.3rem]">
//           <button onClick={onClick} className="h-[2.7rem] w-[2.7rem] ">
//             <img className="h-[2.7rem] w-[2.7rem]" src={back} alt="" /> {/* 다시하기 */}
//           </button>
//         </div>
//         <Link to="/">
//           <div className="flex  space-y-[0.3rem]">
//             <button className="h-[2.7rem] w-[2.7rem] ">
//               <img className="h-[2.7rem] w-[2.7rem]" src={home} alt="" />
//             </button>
//           </div>
//         </Link>
//       </div>
//     );
//   }
//   return (
//     <div className="inline-flex flex-row w-[90%]  place-content-end gap-6">
//       <div className="flex   space-y-[0.3rem]">
//         <button onClick={onClick} className="h-[2.7rem] w-[2.7rem] ">
//           <img className="h-[2.7rem] w-[2.7rem]" src={restart} alt="" /> {/* 다시하기 */}
//         </button>
//       </div>
//       <Link to="/">
//         <div className="flex  space-y-[0.3rem]">
//           <button className="h-[2.7rem] w-[2.7rem] ">
//             <img className="h-[2.7rem] w-[2.7rem]" src={home} alt="" />
//           </button>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default MobileBottomBtn;
