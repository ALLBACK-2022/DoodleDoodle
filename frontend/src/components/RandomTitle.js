function RandomTitle({ word, isMobile }) {
  // eslint-disable-next-line react/no-unescaped-entities
  if (isMobile) {
    return (
      <h1
        className="randomshadow textborder text-[3.125rem] text-primary-1 whitespace-pre
  font-cookierun whitespace-pre text-center leading-relaxed"
      >{`' ${word}' 를
그려보세요!`}</h1>
    );
  }
  return (
    <h1
      className="textshadow textborder text-7xl text-primary-1 mt-5
  font-cookierun whitespace-normal text-center leading-relaxed"
    >{`'${word}' 를 그려보세요!`}</h1>
  );
}
export default RandomTitle;
