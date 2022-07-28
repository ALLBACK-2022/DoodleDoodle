function ResultText({ name, value, textSize }) {
  let text = '';
  if (value < 30) {
    text = `AI는 ${name}을(를)\n${value}% 밖에 예측을 못했네요...`;
  } else if (value < 60) {
    text = `AI는 ${name}을(를) ${value}% 정도로 예측했네요.`;
  } else {
    text = `AI는 ${name}을(를) ${value}% 나 예측했어요!`;
  }

  switch (textSize) {
    case 3:
      return (
        <h1
          className="font-cookierun text-center
          deskTop:text-[3vmin] mobile:text-[2vh]"
        >
          {text}
        </h1>
      );

    default:
      return <h1 className="lg:text-6xl sm:text-3xl font-cookierun lg:mb-[3rem] sm:mb-[1rem]">{text}</h1>;
  }
}

export default ResultText;
