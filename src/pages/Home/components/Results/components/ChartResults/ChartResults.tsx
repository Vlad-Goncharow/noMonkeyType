import {
  Chart as ChartJS,
  ChartOptions,
  registerables
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { getTestResultData } from '../../../../../../redux/slices/TestResult/selectors';

ChartJS.register(...registerables);

const ChartResults = () => {
  const { secondStats } = useAppSelector(getTestResultData);

  const labels = secondStats.map((stat) => stat.second);
  const wpmData = secondStats.map((stat) => stat.wpm);
  const rawData = secondStats.map((stat) => stat.raw);
  const errorsData = secondStats.map((stat) => (stat.errors > 0 ? stat.errors : null));

  const data = {
    labels,
    datasets: [
      {
        label: 'wpm',
        data: wpmData,
        borderColor: 'yellow',
        backgroundColor: 'yellow',
        borderWidth: 3,
        pointRadius: 1,
        yAxisID: 'yWPM',
        order:2,
      },
      {
        label: 'raw',
        data: rawData,
        borderColor: 'gray',
        backgroundColor: 'gray',
        borderWidth: 3,
        pointRadius: 1,
        yAxisID: 'yWPM',
        order:3,
      },
      {
        label: 'errors',
        data: errorsData,
        backgroundColor:'red',
        borderColor:'red',
        showLine: false,
        yAxisID: 'yErrors',
        skipNull: true,
        borderWidth: 2,
        order: 1,
        pointStyle:'crossRot',
        pointRadius: function (context:any): number {
          const index = context.dataIndex;
          const value = context.dataset.data[index] as number;
          return (value ?? 0) <= 0 ? 0 : 3;
        },
        pointHoverRadius: function (context:any): number {
          const index = context.dataIndex;
          const value = context.dataset.data[index] as number;
          return (value ?? 0) <= 0 ? 0 : 5;
        },
      }
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yWPM: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Words per Minute (WPM)',
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
      },
      yErrors: {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Errors',
        },
        beginAtZero: true,
        grid: {
          display: false,
        },
        min: 0,
        ticks: {
          stepSize: 1,
          callback: (value: any) => value,
        },
      },
      x: {
        ticks: {
          autoSkip: true,
          autoSkipPadding: 20,
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `${labels[index]}`;
          },
        },
      },
      legend: {
        display: false, 
      },
    },
  };


  return <Line data={data} options={options} />;
};

export default ChartResults;
