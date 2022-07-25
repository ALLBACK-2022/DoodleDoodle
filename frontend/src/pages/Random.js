import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import recreate from '../assets/icons/changeImg.png';
import play from '../assets/icons/startImg.png';
import ContentText from '../components/ContentText';
<<<<<<< develop
<<<<<<< develop
import DoodleBelt from '../components/DoodleBelt';
=======
>>>>>>> feat: start mobile randompage
=======
import DoodleBelt from '../components/DoodleBelt';
>>>>>>> feat: add doodleicons, mobile random page
import MobileRandomBtn from '../components/MobileRandomBtn';
import RandomTitle from '../components/RandomTitle';
import RandomWordButton from '../components/RandomWordButton';
import StartDrawButton from '../components/StartDrawButton';

function Random() {
  const [word, setWord] = useState('');
  const isMobile = useMediaQuery({
    query: '(max-width: 700px)',
  });
  const isPc = useMediaQuery({
    query: '(min-width: 701px)',
  });

  return (
    <div className="m-0 w-screen h-screen bg-primary flex flex-col">
      {isMobile && <DoodleBelt isTop />}
      <div className="m-auto flex flex-col items-center justify-self-center">
        <div className="self-center">
          <RandomTitle word={word} isMobile={isMobile} />
        </div>
        {isPc && (
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
        )}
        {isMobile && (
          <div className="flex flex-col mt-[6.5rem]">
            <MobileRandomBtn setWord={setWord} start={false} word={word} />
            <MobileRandomBtn start word={word} />
          </div>
        )}
      </div>
      {isMobile && <DoodleBelt isTop={false} />}
    </div>
  );
}

export default Random;
