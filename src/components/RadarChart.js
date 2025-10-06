import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const SinnerRadarChart = ({ currentFactors, recommendedFactors }) => {
  const data = [
    {
      factor: 'Temperature',
      current: currentFactors.temperature,
      recommended: recommendedFactors.temperature,
    },
    {
      factor: 'Chemical',
      current: currentFactors.chemical,
      recommended: recommendedFactors.chemical,
    },
    {
      factor: 'Mechanical',
      current: currentFactors.mechanical,
      recommended: recommendedFactors.mechanical,
    },
    {
      factor: 'Time',
      current: currentFactors.time,
      recommended: recommendedFactors.time,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="factor" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Current"
          dataKey="current"
          stroke="#1976d2"
          fill="#1976d2"
          fillOpacity={0.5}
        />
        <Radar
          name="Recommended"
          dataKey="recommended"
          stroke="#4caf50"
          fill="#4caf50"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SinnerRadarChart;
