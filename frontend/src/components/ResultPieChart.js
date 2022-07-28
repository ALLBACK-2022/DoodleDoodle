import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';

function ResultPieChart({ chartData }) {
  const COLORS = ['#f8d359', '#d9d9d9']; // 노랑, 흰색
  return (
    <ResponsiveContainer>
      <PieChart width="100%" height="100%">
        <Pie data={chartData} cx="50%" cy="50%" innerRadius="75%" outerRadius="100%" fill="#f8d359" dataKey="value">
          {chartData.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
/*
    <ResponsiveContainer>
      <PieChart width={200} height={200}>
        <Pie data={chartData} cx="50%" cy="50%" innerRadius="75%" outerRadius="100%" fill="#f8d359" dataKey="value">
          {chartData.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
*/

export default ResultPieChart;
