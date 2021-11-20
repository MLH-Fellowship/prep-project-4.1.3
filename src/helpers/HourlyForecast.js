import React from 'react';
import { Line } from 'react-chartjs-2';

function HourlyForecast({results}) {
    const data = {
        labels: ['+1 H', '+2 H', '+3 H', '+4 H', '+5 H'],
        datasets: [
          {
            label: 'Temperature in Celsius',
            data: [results.hourly[0].temp,results.hourly[1].temp,results.hourly[2].temp,results.hourly[3].temp,results.hourly[4].temp],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ],
      };
      
      const options = {
        scales: {
          y: {
            beginAtZero: false,
            ticks:{
                color:'white'
            }
          },
          x: {
            ticks:{
                color:'white'
            }
          }
        },
        plugins:{
            legend: {
              labels:{
                color:'white'
              }
            }
          }
      };
    return (
        <Line data={data} options={options} />
    )
}

export default HourlyForecast
