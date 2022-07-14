import MainText from '../components/MainText';
import AboutIcon from '../assets/icons/aboutIcon.png';
import MainIcon from '../assets/icons/mainIcon.png';

/*
 *   '두들 두들!' 시작 페이지
 */

function Main() {
  return (
    <div className="flex m-0 w-screen h-screen relative bg-primary">
      <div className="flex flex-wrap">
        <img className="absolute left-12 top-12 w-14 h-14" src={AboutIcon} alt="" />
        <img className=" absolute top-10 right-10  h-[35rem] " src={MainIcon} alt="" />

        <div className=" flex-col ml-[13vh] mt-[28vh] flex ">
          <MainText text=" 두들, 두들! " />
          <h2 className="className = mt-8 ml-52 text-5xl text-primary-1 font-cookierun doddleshadow textborder">
            Doodle, Doodle
          </h2>
        </div>

        <div className>start</div>
      </div>
    </div>
  );
}

export default Main;
