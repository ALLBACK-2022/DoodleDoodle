function PieChartLabel({ text }) {
  if (text.length < 4)
    return (
      <div
        className="desekTop:text-[3vmin] mobile:text-[2.2vh]
        font-black font-cookierun text-center"
      >
        {text}
      </div>
    );
  if (text.length < 6)
    return (
      <div
        className="desekTop:text-[2.5vmin] mobile:text-[1.9vh]
        font-black font-cookierun text-center"
      >
        {text}
      </div>
    );
  return (
    <div
      className="deskTop:text-[1.8vmin] mobile:text-[1.6vh]
      font-black font-cookierun text-center"
    >
      {text}
    </div>
  );
}

export default PieChartLabel;
