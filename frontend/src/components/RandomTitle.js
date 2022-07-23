function RandomTitle({ word, textSize }) {
  switch (textSize) {
    case 'mobile':
      return (
        <h1 className="textshadow textborder text-7xl text-primary-1 font-cookierun">{`'${word}' 를 그려보세요!`}</h1>
      );

    default:
      return (
        <h1 className="textshadow textborder text-7xl text-primary-1 font-cookierun">{`'${word}' 를 그려보세요!`}</h1>
      );
  }
}
export default RandomTitle;
