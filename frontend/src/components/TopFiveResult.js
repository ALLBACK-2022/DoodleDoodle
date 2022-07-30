import ResultPieChart from './ResultPieChart';
import PieChartLabel from './PieChartLabel';
import ResultImage from './ResultImage';

function TopFiveResult({ isPc, rank, chartValue, imageUrl, chartName }) {
  const positionSetting = [
    { left: 2, top: 2 },
    { left: 70, top: 0 },
    { left: 65, top: 40 },
    { left: 35, top: 70 },
    { left: 0, top: 70 },
  ]; // 1~5등 결과마다 다른 위치값 저장

  const sizeSetting = {
    mobile: { basic: 12.5, max: 28.7 },
    firstPC: { basic: 20, max: 30 },
    pc: { basic: 12, max: 18 },
  }; // 화면에 따른 사이즈값 저장

  let basic = 0;
  let max = 0;
  let left = 0;
  let top = 0;
  let basicUnit = 'vw';
  let maxUnit = 'vh';

  if (isPc) {
    if (rank === 0) {
      basic = sizeSetting.firstPC.basic;
      max = sizeSetting.firstPC.max;
    } else {
      basic = sizeSetting.pc.basic;
      max = sizeSetting.pc.max;
    }
    left = positionSetting[rank].left;
    top = positionSetting[rank].top;
    basicUnit = 'vw';
    maxUnit = 'vh';
  } else {
    basic = sizeSetting.mobile.basic;
    max = sizeSetting.mobile.max;
    basicUnit = 'vh';
    maxUnit = 'vw';
  }
  return (
    <div
      className={`${isPc ? 'absolute' : ''} flex-col
      w-[${basic}${basicUnit}] h-[${basic}${basicUnit}] 
      max-h-[${max}${maxUnit}] max-w-[${max}${maxUnit}]
      left-[${left}%] top-[${top}%]`}
    >
      <div className="relative h-[100%]">
        <ResultPieChart chartData={chartValue} />
        <ResultImage imageUrl={imageUrl} />
      </div>
      <PieChartLabel text={chartName} />
    </div>
  );
}

export default TopFiveResult;
