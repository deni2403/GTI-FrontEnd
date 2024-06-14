import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import PropType from 'prop-types';
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(ChartDataLabels);

function DoughnutChart({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const filteredData = {
      ...initialData,
      datasets: initialData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.filter((value) => value !== 0),
        backgroundColor: dataset.backgroundColor.filter(
          (_, index) => dataset.data[index] !== 0,
        ),
        borderColor: dataset.borderColor.filter(
          (_, index) => dataset.data[index] !== 0,
        ),
      })),
      labels: initialData.labels.filter(
        (_, index) => initialData.datasets[0].data[index] !== 0,
      ),
    };
    setData(filteredData);
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
