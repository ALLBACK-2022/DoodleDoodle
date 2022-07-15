import { Pie, PieChart, ResponsiveContainer } from 'recharts';

function ResultPieChart() {
  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie dataKey="value" data={data02} cx="50%" cy="50%" innerRadius={75} outerRadius={105} fill="#82ca9d" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ResultPieChart;
