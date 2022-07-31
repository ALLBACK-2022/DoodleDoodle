import React from 'react';
import ResultPieChart from './ResultPieChart';
import PieChartLabel from './PieChartLabel';
import ResultImage from './ResultImage';
import '../TopFiveResult.css';

function TopFiveResult({ isPc, rank, chartData, imageUrl }) {
  if (isPc) {
    return (
      <div className={`rank_${rank + 1}`}>
        <div className="relative h-[100%]">
          <ResultPieChart chartValue={chartData.value} />
          <ResultImage imageUrl={imageUrl} />
        </div>
        <PieChartLabel text={chartData.name} />
      </div>
    );
  }

  return (
    <div className="mobile">
      <div className="relative h-[100%]">
        <ResultPieChart chartValue={chartData.value} />
        <ResultImage imageUrl={imageUrl} />
      </div>
      <PieChartLabel text={chartData.name} />
    </div>
  );
}
export default TopFiveResult;
