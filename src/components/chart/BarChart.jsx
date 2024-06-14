import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import PropType from 'prop-types';

function BarChart({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false, // Atur ke false agar tidak menjaga rasio aspek
        scales: {
          y: {
            ticks: {
              stepSize: 1,
              callback: function (value) {
                return Number.isInteger(value) ? value : null; // Menampilkan hanya nilai integer
              },
            },
          },
        },
        plugins: {
          datalabels: {
            display: false,
          },
        },
      }}
    />
  );
}

BarChart.propTypes = {
  initialData: PropType.objectOf(PropType.any).isRequired,
};

export default BarChart;
