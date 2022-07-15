import MainText from '../components/MainText';
import AboutIcon from '../assets/icons/aboutIcon.png';
import MainIcon from '../assets/icons/mainIcon.png';
import NumIcon from '../components/NumIcon';

/*
 *   '두들 두들!' 시작 페이지
 */

function Main() {
  return (
    <div className="flex m-0 w-screen h-screen relative bg-primary">
      <div className="flex flex-wrap">
        <button className="absolute left-12 top-12 w-14 h-14">
          <img src={AboutIcon} alt="" />
        </button>

        <img className=" absolute mt-[13vh] right-10  h-[35rem]  " src={MainIcon} alt="" />

        <div className=" flex-col ml-[13vh] mt-[28vh] flex ">
          <MainText text=" 두들, 두들! " />
          <h2 className="className = mt-8 ml-52 text-5xl text-primary-1 font-cookierun doddleshadow textborder">
            Doodle, Doodle
          </h2>

          <div className="flex-row flex left-0 mt-[16vh] ml-[5.5vw]">
            <div className="flex ">
              <button className="text-6xl text-primary-1 font-cookierun startshadow textborder">start</button>
              <div className="ml-20">
                <NumIcon Num="2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
