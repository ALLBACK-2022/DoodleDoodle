function ResultText({ text, textSize }) {
  switch (textSize) {
    case 3:
      return <h1 className="text-3xl ont-blackf font-cookierun h-[12%] text-center mb-[3rem]">{text}</h1>;

    default:
      return <h1 className="text-6xl ont-blackf font-cookierun mb-[3rem]">{text}</h1>;
  }
}

export default ResultText;
