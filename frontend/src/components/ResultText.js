function ResultText({ text, textSize }) {
  switch (textSize) {
    case 3:
      return <h1 className="lg:text-3xl sm:text-xl ont-blackf font-cookierun h-[12%] text-center mb-[3rem]">{text}</h1>;

    case 10: // result one Page
      return (
        <div
          className="font-cookierun text-center deskTop:h-[8vh]
          deskTop:text-[3vmin] mobile:text-[2vh]"
        >
          {text}
        </div>
      );

    default:
      return <h1 className="lg:text-6xl sm:text-3xl ont-blackf font-cookierun lg:mb-[3rem] sm:mb-[1rem]">{text}</h1>;
  }
}

export default ResultText;
