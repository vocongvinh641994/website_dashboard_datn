import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'JAN', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'FEB', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'MAR', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'APR', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'MAY', uv: 1890, pv: 4800, amt: 2181 },
];

const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
