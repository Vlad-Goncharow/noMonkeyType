import {
  Chart as ChartJS,
  ChartOptions,
  registerables
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { getGameResultData } from '../../../../../../redux/slices/GameResult/selectors';

ChartJS.register(...registerables);

const ChartResults = () => {
  const { secondStats } = useAppSelector(getGameResultData);

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
        borderWidth: 2,
        pointRadius: 3,
        yAxisID: 'yWPM',
      },
      {
        label: 'raw',
        data: rawData,
        borderColor: 'gray',
        backgroundColor: 'gray',
        borderWidth: 2,
        pointRadius: 3,
        yAxisID: 'yWPM',
      },
      {
        label: 'errors',
        data: errorsData,
        pointStyle: 'star',
        backgroundColor:'red',
        borderColor:'red',
        pointRadius: 3,
        showLine: false,
        yAxisID: 'yErrors',
        skipNull: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio:false,
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
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `${labels[index]}`; // Показать секунду
          },
        },
      },
      
      legend: {
        display: false, // Скрыть легенду
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ChartResults;
