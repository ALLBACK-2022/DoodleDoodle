import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// const baseURL = 'http://localhost:5000/randwords';
const baseURL = 'http://127.0.0.1:5000/api/randwords';
function MobileRandomBtn({ setWord, start, word }) {
  const location = useLocation(); // 이전 페이지에서 받아온 데이터
  const navigate = useNavigate(); // 페이지 이동 시 사용

  async function goNextPage() {
    const req = {
      id: location.state.gameID,
      name: word,
    };

    await axios.post(baseURL, req).then(
      navigate('../gamepage', {
        replace: true,
        state: { drawWord: word, playerNum: location.state.playerNum, gameID: location.state.gameID },
      }),
    );
  }

  async function getRandWord() {
    const response = await axios.get(baseURL);
    setWord(response.data);
    console.log(response.data);
  }
  useEffect(() => {
<<<<<<< develop
<<<<<<< develop
    if (!start) {
=======
    if (start) {
>>>>>>> feat: start mobile randompage
=======
    if (!start) {
>>>>>>> feat: add doodleicons, mobile random page
      getRandWord();
    }
    console.log('useEffect() here');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (start) {
    return (
<<<<<<< develop
<<<<<<< develop
      <button
        onClick={goNextPage}
        className="btnshadow mb-[1.6rem] text-[1.75rem] font-black 
<<<<<<< develop
    font-cookierun_m bg-primary-4 rounded-[30px] w-[18.75rem] h-[3.5rem]"
      >
        네!
=======
      font-cookierun_m bg-primary-4 rounded-[30px] w-[18.75rem] h-[3.5rem]"
      >
        다른 거 그리고 싶어요
>>>>>>> feat: start mobile randompage
      </button>
=======
      <Link to="/gamepage">
        <button
          onClick={goNextPage}
          className="btnshadow mb-[1.6rem] text-[1.75rem] font-black 
    font-cookierun_m bg-primary-4 rounded-[30px] w-[18.75rem] h-[3.5rem]"
        >
          네!
        </button>
      </Link>
>>>>>>> feat: add doodleicons, mobile random page
=======
      <button
        onClick={goNextPage}
        className="btnshadow mb-[1.6rem] text-[1.75rem] font-black 
    font-cookierun_m bg-primary-4 rounded-[30px] w-[18.75rem] h-[3.5rem]"
      >
        네!
      </button>
>>>>>>> feat: delete link tag
    );
  }
  return (
    <button
      onClick={getRandWord}
      className="btnshadow mb-[1.6rem] text-[1.75rem] font-black
      font-cookierun_m bg-primary-4 rounded-[30px] w-[18.75rem] h-[3.5rem]"
    >
      다른 거 그리고 싶어요
=======
    font-cookierun_m bg-primary-4 rounded-[30px] w-[18.75rem] h-[3.5rem]"
    >
      네!
>>>>>>> feat: start mobile randompage
=======
      font-cookierun_m bg-primary-4 rounded-[30px] w-[18.75rem] h-[3.5rem]"
    >
      다른 거 그리고 싶어요
>>>>>>> feat: add doodleicons, mobile random page
    </button>
  );
}

export default MobileRandomBtn;
