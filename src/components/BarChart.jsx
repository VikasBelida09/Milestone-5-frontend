import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const BarChart = ({data,text}) => {
   const options={
    plugins: {
        title: {
          display: true,
          text: text
        }
      }
   }
  return (
       <Bar options={options} data={data} className="barchart-style"/>
  )
}

export default BarChart
