import React from 'react';

function WordText({ randWord }) {
  return (
    <div
      className="text-grey font-cookierun absolute
      h-[6vmin] left-[50%] translate-x-[-50%]
      deskTop:text-[6vmin] deskTop:top-[5.5%] deskTop:flex
      mobile:w-[100%] mobile:text-[8.5vmin] mobile:top-[3%]
      items-center text-center"
    >
      &lt;{randWord}&gt;
    </div>
  );
}

export default WordText;
