import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BusynessDataPoint } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BusynessChartProps {
  data: BusynessDataPoint[];
  isDarkMode: boolean;
}

export function BusynessChart({ data, isDarkMode }: BusynessChartProps) {
  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}${period}`;
  };

  const chartData = {
    labels: data.map(point => formatHour(point.hour)),
    datasets: [
      {
        label: 'Busyness Level',
        data: data.map(point => point.busyness),
        borderColor: isDarkMode ? 'rgb(167, 139, 250)' : 'rgb(147, 51, 234)',
        backgroundColor: isDarkMode ? 'rgba(167, 139, 250, 0.5)' : 'rgba(147, 51, 234, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Daily Busyness Pattern',
        color: isDarkMode ? '#e5e7eb' : '#374151',
        font: {
          size: 16,
          weight: '600',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          color: isDarkMode ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
        },
      },
      x: {
        ticks: {
          color: isDarkMode ? '#9ca3af' : '#4b5563',
        },
        grid: {
          color: isDarkMode ? '#374151' : '#e5e7eb',
        },
      },
    },
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <Line data={chartData} options={options} />
    </div>
  );
}