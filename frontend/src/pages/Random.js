import { useState } from 'react';
import recreate from '../assets/icons/changeImg.png';
import play from '../assets/icons/startImg.png';
import ContentText from '../components/ContentText';
import RandomTitle from '../components/RandomTitle';
import RandomWordButton from '../components/RandomWordButton';
import StartDrawButton from '../components/StartDrawButton';
import { isPc, isMobile } from '../MediaQuery';

/*
 *   '두들 두들!' 단어 선택 페이지
 */

function Random() {
  const [word, setWord] = useState('');

  return (
    <div>
      {isPc && (
        <div className="m-0 w-screen h-screen bg-primary flex">
          <div className="m-auto flex flex-col items-center">
            <div className="self-center">
              <RandomTitle word={word} />
            </div>
            <div className="flex mt-80">
              <div className="mr-64 flex flex-col items-center">
                <ContentText text="다른 거 그리고 싶어요" />
                <RandomWordButton image={recreate} setWord={setWord} />
              </div>
              <div className="ml-64 flex flex-col items-center">
                <ContentText text="네!" />
                <StartDrawButton image={play} word={word} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile && <p>This is Mobile!</p>}
    </div>
  );
}

export default Random;
