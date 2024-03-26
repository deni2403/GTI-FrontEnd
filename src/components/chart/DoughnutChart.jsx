import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import PropType from 'prop-types';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels);

function DoughnutChart({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false, // Atur ke false agar tidak menjaga rasio aspek
        plugins: {
          datalabels: {
            anchor: 'middle',
            align: 'middle',
            formatter: (value) => value,
            color: 'white',
            font: {
              size: 14,
              weight: '600',
            },
          },
        },
      }}
    />
  );
}

DoughnutChart.propTypes = {
  initialData: PropType.objectOf(PropType.any).isRequired,
};

export default DoughnutChart;
